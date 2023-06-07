import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
@Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();
  editModeChanged = new Subject<boolean>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Orange', 5),
    new Ingredients('Banana', 5),
  ];
  AddIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  DeleteIngredient(deleteIngredient: Ingredients) {
    this.ingredients = this.ingredients.filter(
      (ingredient) => deleteIngredient !== ingredient
    );
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientsbyIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredientsFromRecipe(ingredients: Ingredients[]) {
    // for (let ingredient of ingredients) {
    //   this.AddIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredients(index: number, updatedIngredient: Ingredients) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
