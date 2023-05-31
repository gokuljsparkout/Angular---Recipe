import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'This is a Test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      [new Ingredients('Meat', 1), new Ingredients('French Fries', 20)]
    ),
    new Recipe(
      'Pizza',
      'This is a Test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
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

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    this.shoppinglistService.addIngredientsFromRecipe(ingredients);
  }
}
