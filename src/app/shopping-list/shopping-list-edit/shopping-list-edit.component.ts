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
  editMode = false;
  editedItemIndex: number;
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('addItemForm') addItemForm: NgForm;
  onAddItem() {
    const value = this.addItemForm.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    this.shoppingListService.AddIngredient(newIngredient);
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
