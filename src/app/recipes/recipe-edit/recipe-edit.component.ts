import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  addRecipeForm: FormGroup;
  recipeName: string;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) {}
  onSubmit() {
    console.log(this.addRecipeForm.value);
  }

  ngOnInit() {
    this.addRecipeForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      imagePath: new FormControl(null),
      ingredients: new FormGroup({
        name: new FormControl(null),
        amount: new FormControl(null),
      }),
    });
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['recipe-name'] ? true : false;
    });
  }
}
