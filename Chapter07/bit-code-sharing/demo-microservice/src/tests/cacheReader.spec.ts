import {expect} from 'chai';

describe("hello world mocha test service", function(){  
    it("should create the user with the correct name",()=>{
        let helloDef=()=>'hello world';
        let helloRes=helloDef();
        expect(helloRes).to.equal('hello world');
    });
});
