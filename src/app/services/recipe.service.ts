import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  @Output() recipeUpdate$: EventEmitter<Recipe> = new EventEmitter();
  constructor() { }

  updateRecipe(recipe: Recipe) {
    this.recipeUpdate$.emit(recipe);
  }
}
