import { exportedValue } from './TestFolder/TestFile';
import { testFn } from './TestFolder2/TestFile2';
import { MathSolver } from './ClassFolder/MathSolver';

const test: string = "Hello World!";
console.log(test);
console.log(exportedValue);

const number1: number = 23;
const number2: number = 32; 
const result: number = testFn(number1, number2);
console.log(result);

const SOLVER = new MathSolver("Solver1");
console.log(SOLVER.name);
SOLVER.name = 'Miro' ; 
console.log(SOLVER.name);

const SOLVER2 = new MathSolver('LEMMY');
console.log(SOLVER2.name);





