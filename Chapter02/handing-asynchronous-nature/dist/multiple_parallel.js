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
function executeParallelAsyncTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const [valueA, valueB, valueC] = yield Promise.all([yield Axios_1.default.get('https://jsonplaceholder.typicode.com/posts/1'),
            yield Axios_1.default.get('https://jsonplaceholder.typicode.com/posts/2'),
            yield Axios_1.default.get('https://jsonplaceholder.typicode.com/posts/3')]);
        console.log("first response is ", valueA.data);
        console.log(" second response is ", valueB.data);
        console.log("third response is ", valueC.data);
    });
}
executeParallelAsyncTasks();
//# sourceMappingURL=multiple_parallel.js.map