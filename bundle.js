(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// export class MathSolver {
//     private _name: string;
//     public constructor(name: string) {
//         this.name = name;
//     };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathSolver = void 0;
//     public set name(namee: string) {
//         this._name = namee;
//     };
//     public get name(): string {
//         return this._name;
//     };
// };
class MathSolver {
    constructor(nameee) {
        this.name = nameee;
    }
    set name(nameeeee) {
        this._name = nameeeee;
    }
    get name() {
        return this._name;
    }
}
exports.MathSolver = MathSolver;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFn = void 0;
exports.testFn = (a, b) => {
    return a + b;
};

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportedValue = void 0;
exports.exportedValue = 23;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestFile_1 = require("./TestFolder/TestFile");
const TestFile2_1 = require("./TestFolder2/TestFile2");
const MathSolver_1 = require("./ClassFolder/MathSolver");
const test = "Hello World!";
console.log(test);
console.log(TestFile_1.exportedValue);
const number1 = 23;
const number2 = 32;
const result = TestFile2_1.testFn(number1, number2);
console.log(result);
const SOLVER = new MathSolver_1.MathSolver("Solver1");
console.log(SOLVER.name);
SOLVER.name = 'Miro';
console.log(SOLVER.name);
const SOLVER2 = new MathSolver_1.MathSolver('LEMMY');
console.log(SOLVER2.name);

},{"./ClassFolder/MathSolver":1,"./TestFolder/TestFile":3,"./TestFolder2/TestFile2":2}]},{},[4]);
