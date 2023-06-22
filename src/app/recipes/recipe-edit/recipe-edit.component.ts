import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  addRecipeForm: FormGroup;b
  recipeName: string;
  editMode: boolean = false;
  recipeIndex: number;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  onSubmit() {
    console.log(this.addRecipeForm.value);
    const edittedRecipe = this.addRecipeForm.value;
    if (this.editMode) {
      this.recipeService.recipeEdit(edittedRecipe, this.recipeIndex);
    } else {
      this.recipeService.addRecipe(edittedRecipe);
      this.addRecipeForm.reset();
    }
    this.recipeService.recipeEditted.next(null);
    console.log(this.addRecipeForm.get('ingredients'));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['recipe-name'] ? true : false;
      this.recipeName = params['recipe-name'];
      if (this.editMode) {
        this.recipeIndex = this.recipeService.findIndex(this.recipeName);
      }

      this.initForm();
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.addRecipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.addRecipeForm.reset();
  }

  onAddIngredient() {
    (<FormArray>this.addRecipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  onDeleteIngredient(i) {
    (<FormArray>this.addRecipeForm.get('ingredients')).removeAt(i);
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeName);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }
    this.addRecipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDescription),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients,
    });
  }
}
