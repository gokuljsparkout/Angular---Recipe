import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeEditted = new Subject();

  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'This is a Test',
      'https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,size=626',
      [new Ingredients('Meat', 1), new Ingredients('French Fries', 20)]
    ),
    new Recipe(
      'Pizza',
      'This is a Test',
      'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-sliced-into-six-slices_141793-2157.jpg?size=626&ext=jpg',
      [new Ingredients('Meat', 1), new Ingredients('French Fries', 20)]
    ),
  ];
  constructor(private shoppinglistService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(recipeName: string) {
    return this.recipes.find((recipe) => recipe.name === recipeName);
  }

  addIngredientsArrayToShoppingList(ingredients: Ingredients[]) {
    this.shoppinglistService.addIngredientsArrayFromRecipe(ingredients);
  }
  addIngredientToShoppingList(ingredient: Ingredients) {
    this.shoppinglistService.addIngredientFromRecipe(ingredient);
  }
  findIndex(recipeName: string) {
    return this.recipes.findIndex((recipe) => recipe.name === recipeName);
  }
  addRecipe(recipe) {
    this.recipes.push(recipe);
  }
  recipeEdit(recipe, recipeIndex) {
    this.recipes[recipeIndex] = recipe;
  }
}
