import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  addRecipeForm: FormGroup;
  recipeName: string;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  onSubmit() {
    console.log(this.addRecipeForm.value);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['recipe-name'] ? true : false;
      this.recipeName = params['recipe-name'];
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeName);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
    }
    this.addRecipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDescription),
      imagePath: new FormControl(recipeImagePath),
    });
  }
}
