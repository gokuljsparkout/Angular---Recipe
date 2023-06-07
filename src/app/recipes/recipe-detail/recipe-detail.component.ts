import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipes: Recipe[];
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params['recipe-name']);
    });
  }

  onAddToShoppingList() {
    this.recipe.ingredients.map((recipeIngredient) => {
      const foundIngredient =
        this.shoppingListService.checkforExisitingIngredient(recipeIngredient);
      if (foundIngredient.isExisting) {
        this.shoppingListService.updateAmount(
          foundIngredient.index,
          recipeIngredient.amount
        );
      } else {
        this.recipeService.addIngredientToShoppingList(recipeIngredient);
      }
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
