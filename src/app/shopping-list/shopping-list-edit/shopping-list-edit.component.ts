import { Component, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('addItemForm') addItemForm: NgForm;
  onAddItem() {
    const value = this.addItemForm.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    this.shoppingListService.AddIngredient(newIngredient);
  }
}
