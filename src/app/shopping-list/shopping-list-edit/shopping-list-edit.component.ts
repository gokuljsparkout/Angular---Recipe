import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  subscription: Subscription;
  firstInitialization = true;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('addItemForm') addItemForm: NgForm;
  onAddItem() {
    const value = this.addItemForm.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    this.shoppingListService.AddIngredient(newIngredient);
    this.addItemForm.reset();
  }

  onDeleteItem() {
    this.shoppingListService.DeleteIngredient(this.editedItem);
  }

  check() {}
  onClear() {
    this.addItemForm.setValue({
      name: '',
      amount: null,
    });
  }

  onUpdateItem() {
    const value = this.addItemForm.value;
    const updatedIngredient = new Ingredients(value.name, value.amount);
    this.shoppingListService.updateIngredients(
      this.editedItemIndex,
      updatedIngredient
    );
    this.addItemForm.reset();
    this.editMode = false;
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        if (this.firstInitialization) {
          this.editMode = true;
          this.firstInitialization = false;
        } else {
          this.editMode = !this.editMode;
        }
        this.shoppingListService.editModeChanged.next(this.editMode);
        this.editedItem = this.shoppingListService.getIngredientsbyIndex(index);
        this.addItemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
