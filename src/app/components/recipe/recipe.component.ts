import { Component, OnInit, Input } from '@angular/core';
import { Recipe, RecipeResponse } from 'src/app/models/models';
import { RecipeListService } from 'src/app/services/recipe-list.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  deleting: boolean = false;
  
  constructor(
    private recipeListService: RecipeListService, 
  ) { }

  ngOnInit() {
  }

  deleteRecipe(id: string) {
    this.deleting = true;
    this.recipeListService.deleteRecipe(id).subscribe((data:RecipeResponse) => {
      if (data && data.data) {
        this.deleting = false;
        this.recipeListService.getRecipes();
      }
    })
  }

}
