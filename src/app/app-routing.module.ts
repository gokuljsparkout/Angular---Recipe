import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path : '' ,redirectTo: '/recipes' ,pathMatch : 'full'},
  //pathMatch property says only redirect when the full path matches
  {path : 'recipes' , component : RecipesComponent},
  {path : 'shopping-list' , component : ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
