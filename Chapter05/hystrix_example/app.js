
var express = require('express'),
    Promise = require('q'),
    request = require('request'),
    getRandomInt = require('./random_int'),
    http = require('request-promise-json'),
    _ = require("lodash"),
    hystrixStream = require('../../lib/http/HystrixSSEStream'),
    CommandsFactory = require("../../lib/command/CommandFactory");

var makeRequest = function(options) {
    var req = _.assign(
        options
    );

    return http.request(req);
};

function hystrixStreamResponse(request, response) {
    response.append('Content-Type', 'text/event-stream;charset=UTF-8');
    response.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    response.append('Pragma', 'no-cache');
    return hystrixStream.toObservable().subscribe(
        function onNext(sseData) {
            response.write('data: ' + sseData + '\n\n');
        },
        function onError(error) {console.log(error);
        },
        function onComplete() {
            return response.end();
        }
    );

};

module.exports = function(port) {
    var app = express(),
        cbs = [],
        commands = [],
        reqs = 0;
    var isErrorHandler = function(error) {
        if (error) {
            return error;
        }
        if (error.statusCode == 503) {
            var unavailableError = new Error();
            unavailableError.name = "ServiceUnavailableError";
            return unavailableError;
        }
        return null;
    };

    this.configure = function(config) {

        config.services.forEach(function(service) {
            var serviceCommand = CommandsFactory.getOrCreate("Service on port :" + service.port + ":" + port)
                .circuitBreakerErrorThresholdPercentage(service.errorThreshold)
                .timeout(service.timeout)
                .run(makeRequest)
                .circuitBreakerRequestVolumeThreshold(service.concurrency)
                .circuitBreakerSleepWindowInMilliseconds(service.timeout)
                .statisticalWindowLength(10000)
                .statisticalWindowNumberOfBuckets(10)
                .errorHandler(isErrorHandler)
                .build();
            serviceCommand.service = service;
            commands.push(serviceCommand);
        });
    };

    app.get('/api/hystrix.stream', hystrixStreamResponse);

    app.get("/", function(req, res) {
        var promises = [];
        commands.forEach(function(command) {
            var n = getRandomInt(1, command.service.calls);
            for (var i = 0; i < n; i++) {
                var url = "http://localhost:" + command.service.port + "/random-sleep/" + command.service.sleep;
                promises.push(command.execute({
                    method: "GET",
                    url: url
                }));
            }
        });

        Promise.all(promises).then(function(results) {
           results.forEach(function(result) {
               res.send(results.join("\n"));
               res.set('Content-Type', 'text/plain');
               reqs++;
           });
        }).catch(function(error) {
            reqs++;
            res.send("Error: " + error);
        });
    });

    this.start = function() {
        process.title = 'node (app:' + port + ')';
        app.listen(port, function() {
            var start = Date.now();
            console.log("[%d] APP Listening on %d", process.pid, port);
            setInterval(function() {
                var elapsed = (Date.now() - start) / 1000;
                var rps = elapsed ? reqs / elapsed : 0;
                console.log("App req/s: " + rps);
            }, 1000);
        });
    };

};
