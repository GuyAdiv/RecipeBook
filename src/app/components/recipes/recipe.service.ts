import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { UUID } from 'angular2-uuid'


export class RecipeService{
    
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            this.getNewRecipeId(),
            "Pizza", 
            "Pizza margarita with extra chees",
            "this is a description how to make pizza", 
            "https://www.messforless.net/wp-content/uploads/2018/01/2-ingredient-pizza-dough-weight-watchers-9.jpg",
                [
                    new Ingredient("Tomatos" , 4),
                    new Ingredient("Cheese" , 200)
                ]
            )
        , new Recipe(
            this.getNewRecipeId(),
            "Apple Pie", 
            "An sweet apple pie.",
            "this is a recipe how to make apple pie", 
            "https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16800-blue-ribbon-apple-pie-600x600.jpg?ext=.jpg",
                [
                    new Ingredient("Apple", 5),
                    new Ingredient("Cinamon", 1)
                ]
            )
    ];

    getNewRecipeId(){
        return UUID.UUID();
    }

    getRecipes(){
        return this.recipes.slice(); //return section of all items as a copy;
    }

    getRecipeById(id:string)
    {
        let result = null;
        let mapResult = this.recipes.filter(value => {
            if (value.id === id)
            {
                return value;
            }
        });

        if (mapResult.length > 0)
        {
            result = mapResult[0];
        }
        return result;
    }

    addRecipe(recipe:Recipe)
    {
        if(recipe)
        {
            recipe.id = this.getNewRecipeId();
            this.recipes.push(recipe);
            this.recipesChanged.next(this.getRecipes());
        }
    }

    updateRecipe(recipeId:string, recipe:Recipe)
    {
        let oldRecipe:Recipe = this.getRecipeById(recipeId);

        if (oldRecipe)
        {
            recipe.id = recipeId;
            oldRecipe = recipe;
            this.recipesChanged.next(this.getRecipes());
            return true;
        }
        return false;
    }

    removeRecipe(recipeId:string)
    {
        debugger
        let index = this.recipes.findIndex((recipe:Recipe)=>{
            return recipe.id == recipeId;
        });

        if (index >= 0)
        {
            this.recipes.slice(index,1);
        }
    }
}