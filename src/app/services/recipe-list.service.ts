import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RecipeInput, Recipe, Recipes, RecipeResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class RecipeListService {
  @Output() recipesList$: EventEmitter<Recipe[]> = new EventEmitter();
  @Output() recipeCreated$: EventEmitter<Recipe> = new EventEmitter();
  @Output() recipeUpdated$: EventEmitter<Recipe> = new EventEmitter();
  baseUrl: String = "https://simple-recipe-demo-api.herokuapp.com"
  constructor(private httpClient : HttpClient) {}

  getRecipes(data = {
    query: {},
    sortBy: "title"
  }) {
    const recipes = this.httpClient.post(`${this.baseUrl}/recipe`, data)
    recipes.subscribe((data: Recipes) => {
      const recipesList:Recipe[] = data.docs;
      this.recipesList$.emit(recipesList)
    });

    return recipes;
  }

  getRecipe(id) {
    return this.httpClient.get(`${this.baseUrl}/recipe/${id}`);
  }

  createRecipe(data:FormData) {
    const recipe = this.httpClient.post(`${this.baseUrl}/recipe/create`, data);
    return recipe;
  }

  updateRecipe(id, data:FormData) {
    const recipe = this.httpClient.put(`${this.baseUrl}/recipe/${id}`, data, {
      reportProgress: true,
      observe: 'events'   
    });

    recipe.subscribe((events) => {
      if(events.type === HttpEventType.Response) {
        const data = <RecipeResponse>events.body;
        if (data && data.data) {
          console.log("Recipe Updated!", data);
          const recipe:Recipe = data.data;
          this.recipeUpdated$.emit(recipe);
        }
      }
    });
    return recipe;
  }

  deleteRecipe(id) {
    return this.httpClient.delete(`${this.baseUrl}/recipe/${id}`);
  }
}
