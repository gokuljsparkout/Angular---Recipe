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
  DeleteIngredient(index) {
    // this.ingredients = this.ingredients.filter(
    //   (ingredient) => deleteIngredient !== ingredient
    // );
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateAmount(index: number, quantity: number) {
    this.ingredients[index].amount += quantity;
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientsbyIndex(index: number) {
    return this.ingredients[index];
  }
  checkforExisitingIngredient(checkIngredient: Ingredients) {
    const found = this.ingredients.findIndex((ingredient) => {
      return checkIngredient.name === ingredient.name;
    });
    console.log(found);
    if (found !== -1) {
      return { isExisting: true, index: found };
    } else {
      return { isExisting: false, index: found };
    }
  }

  addIngredientsArrayFromRecipe(ingredients: Ingredients[]) {
    // for (let ingredient of ingredients) {
    //   this.AddIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredientFromRecipe(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredients(index: number, updatedIngredient: Ingredients) {
    console.log('ui' + index);
    this.ingredients[index] = updatedIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
