import { Component, OnInit } from "@angular/core";
import { RecipeService } from './recipe.service';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector : 'cmp-recipes',
    templateUrl : './recipes.component.html',
    styleUrls : ['./recipes.component.css'],
    providers: [RecipeService]
})
export class RecipesComponent implements OnInit{

    constructor()
    {

    }

    ngOnInit(): void {

    }
}