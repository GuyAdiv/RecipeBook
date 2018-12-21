import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  selectedItemSubscription:Subscription;
  isEditMode:boolean = false;
  selectedItemIndex:number;
  selectedItem:Ingredient;

  @ViewChild('f') editForm:NgForm;
  @Output() ingredientAdded:EventEmitter<Ingredient> = new EventEmitter();

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.selectedItemSubscription = this.shoppingListService.selectedItem.subscribe(
      (index:number) => {
        this.selectedItemIndex = index;
        this.isEditMode = true;
        this.selectedItem = this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          name : this.selectedItem.name,
          amount : this.selectedItem.amount
        })
      }
    );
  }

  onAddItem(form:NgForm)
  {
    const item = form.value;
    const ingredient:Ingredient = new Ingredient(item.name, item.amount);

    if (this.isEditMode)
    {
      this.shoppingListService.updateIngredient(this.selectedItemIndex, ingredient);
    }
    else
    {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onClear(form);
  }

  onClear(form:NgForm){
    form.reset();
    this.isEditMode = false;
  }

  onDelete()
  {
    this.shoppingListService.removeIngredient(this.selectedItemIndex);
    this.onClear(this.editForm);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.selectedItemSubscription.unsubscribe();
  }

}
