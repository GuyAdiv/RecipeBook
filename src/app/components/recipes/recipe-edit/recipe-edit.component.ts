import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId:string;
  isEditMode:boolean = false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit() {
     this.route.params.subscribe(
       (params:Params) => {
          this.recipeId = params['id'];
          this.isEditMode = params['id'] != null;
          this.initForm();
       }
     )
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  initForm(){

    let recipe:Recipe = new Recipe('','','','','',[])
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode)
    {
      recipe = this.recipeService.getRecipeById(this.recipeId);

      if (recipe['ingredients'])
      {
        for (let ingredient of recipe.ingredients) {
          
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
          
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipe.name, Validators.required),
      'info' : new FormControl(recipe.info, Validators.required),
      'imageUrl' : new FormControl(recipe.imageUrl, Validators.required),
      'description' : new FormControl(recipe.description, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  onSubmit(){

    /*let recipe:Recipe = new Recipe(
      this.recipeId, 
      this.recipeForm.value['name'],
      this.recipeForm.value['info'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients']
      )*/ //if the form has same value properties like the model has we can just pass the form value.

    let recipe = this.recipeForm.value;

    if (this.isEditMode)
    {
      this.recipeService.updateRecipe(this.recipeId, recipe)
    }
    else
    {
      this.recipeService.addRecipe(recipe);
    }
  }

  addNewIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  removeIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
