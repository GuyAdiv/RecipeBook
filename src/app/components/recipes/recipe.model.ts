import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public id:string;
    public name:string;
    public info:string;
    public description:string;
    public imageUrl:string;
    public ingredients:Ingredient[];

    constructor(id:string, name:string, info:string, description:string, imageUrl:string, ingredients:Ingredient[])
    {
        this.id = id;
        this.name = name;
        this.info = info;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
    }
}