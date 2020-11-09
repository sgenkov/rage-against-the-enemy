// export class MathSolver {
//     private _name: string;
//     public constructor(name: string) {
//         this.name = name;
//     };

//     public set name(namee: string) {
//         this._name = namee;
//     };

//     public get name(): string {
//         return this._name;
//     };
// };

export class MathSolver {
    private _name: string;

    public constructor( nameee: string) {
        this.name = nameee;
    }

    public set name(nameeeee: string) {
       this._name = nameeeee;
    }

    public get name(): string {
        return this._name;
    }
}
