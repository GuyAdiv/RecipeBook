import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();
    selectedItem = new Subject<number>();

    private ingredients:Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    constructor(){

    }

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number)
    {
        if (index >= 0 && this.ingredients.length > 0)
        {
            return this.ingredients[index];
        }

        return undefined;
    }

    addIngredient(ingredient:Ingredient)
    {    
        if (ingredient.name.length == 0)
        {
            console.log('invalid ingredient name')
            return;
        }
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(ingredients:Ingredient[])
    {
        /* ingredients.forEach(ingredient => {
            this.ingredients.push(ingredient);
        }); */
        this.ingredients.push(...ingredients); //split the array to list of items;
        this.ingredientsChanged.next(this.getIngredients());
    }

    updateIngredient(index:number, ingredient:Ingredient)
    {
        if (index >= 0 && index < this.ingredients.length)
        {
            this.ingredients[index] = ingredient;
            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    removeIngredient(index:number)
    {
        if (index >= 0 && this.ingredients.length > index)
        {
            this.ingredients.splice(index, 1);
            this.ingredientsChanged.next(this.getIngredients());
        }
    }
}