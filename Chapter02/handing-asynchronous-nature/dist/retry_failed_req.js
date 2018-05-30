"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Axios_1 = require("Axios");
class RetryRequest {
    constructor() { }
    wait(timeout) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
    requestWithRetry(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAX_RETRIES = 10;
            for (let i = 0; i <= MAX_RETRIES; i++) {
                try {
                    return yield Axios_1.default.get(url);
                }
                catch (err) {
                    const timeout = Math.pow(2, i);
                    console.log('Waiting', timeout, 'ms');
                    yield this.wait(timeout);
                    console.log('Retrying', err.message, i);
                }
            }
        });
    }
}
exports.RetryRequest = RetryRequest;
let a = new RetryRequest();
a.requestWithRetry('https://localhost:8081/news/get-news-list');
//# sourceMappingURL=retry_failed_req.js.map