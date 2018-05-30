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
const asyncDemo1 = () => __awaiter(this, void 0, void 0, function* () {
    console.log("simple async call");
    let asyncReq1 = yield Axios_1.default.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(asyncReq1.data);
    let asyncReq2 = yield Axios_1.default.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(asyncReq2.data);
});
asyncDemo1();
//map,filter,reduce. 
//# sourceMappingURL=async_await_example.js.map