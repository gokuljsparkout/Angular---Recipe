import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  private ingredientsChangedSubscription: Subscription;
  selectedItemIndex: number;
  editmode = false;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription =
      this.shoppingListService.ingredientChanged.subscribe(
        (ingredients: Ingredients[]) => {
          this.ingredients = ingredients;
        }
      );
    this.shoppingListService.startedEditing.subscribe((index) => {
      this.selectedItemIndex = index;
    });
    this.shoppingListService.editModeChanged.subscribe((editmode) => {
      this.editmode = editmode;
      console.log(this.editmode);
    });
  }
  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient: Ingredients) {
  //   this.ingredients.push(ingredient);
  // }
}
