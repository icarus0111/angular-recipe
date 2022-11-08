import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryList, RecipeResponse, Recipe } from 'src/app/models/models';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.scss']
})
export class ReceipeEditComponent implements OnInit {
  recipe: Recipe;
  categories: CategoryList[]

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    recipeService.recipeUpdate$.subscribe((receipe:Recipe) => {
      this.recipe = receipe;
    })
  }

  ngOnInit() {

  }
}
