import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule, MatProgressBarModule, MatOptionModule, MatSelectModule, MatDialogModule, MatChipsModule, MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormField } from '@angular/material';


import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReceipeDetailComponent } from './pages/receipe-detail/receipe-detail.component';
import { ReceipeEditComponent } from './pages/receipe-edit/receipe-edit.component';



const routes: Routes = [
  // { path:  '', pathMatch:  'full', redirectTo:  'list'},
  { path: '', component: DashboardComponent},
  { path: 'all-receipes', component: DashboardComponent},
  { path: 'all-receipes/:id', component: ReceipeDetailComponent},
  { path: 'all-receipes/:id/edit', component: ReceipeEditComponent}  
];

@NgModule({
  declarations: [
    DashboardComponent,
    ReceipeDetailComponent,
    ReceipeEditComponent,
    RecipeComponent,
    RecipeFormComponent,
    RecipeListComponent,
    CreateRecipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatOptionModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
