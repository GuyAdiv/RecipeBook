import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  private subscription: Subscription

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()

    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (updatedIngredients:Ingredient[]) => {
        this.ingredients = updatedIngredients;
      }
    )
  }

  onListItemClick(index:number)
  {
    this.shoppingListService.selectedItem.next(index);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.subscription.unsubscribe();
    
  }
}
