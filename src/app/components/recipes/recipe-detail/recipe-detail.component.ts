import { Component, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector : 'app-recipe-detail',
    templateUrl : './recipe-detail.component.html',
    styleUrls : ['./recipe-detail.component.css']
})
export class RecipeDetailComponent{

    recipeInfo:Recipe;

    constructor(private shoppingListService:ShoppingListService,
                private recipeService:RecipeService,
                private router:Router,
                private route:ActivatedRoute)
    {

    }

    ngOnInit(): void {
        //debugger

        this.route.params.subscribe(
            (params:Params) => {
                //debugger
                const recipeId = params['id'];
                this.recipeInfo = this.recipeService.getRecipeById(recipeId);
            }
        );
    }

    toShoppingListClick(){
        this.shoppingListService.addIngredients(this.recipeInfo.ingredients);
    }

    removeRecipe(){
        
    }
}