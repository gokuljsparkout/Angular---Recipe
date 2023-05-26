import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
@Injectable()
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredients[]>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Orange', 5),
    new Ingredients('Banana', 5),
  ];
  AddIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredientsFromRecipe(ingredients: Ingredients[]) {
    // for (let ingredient of ingredients) {
    //   this.AddIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
