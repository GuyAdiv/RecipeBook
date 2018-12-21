export class Ingredient
{
    //! When use public in ctor arguments TypeScript will create auto properties from them;
    constructor(public name:string, public amount:number){}
}