import { Component, OnInit } from '@angular/core';
import { RecipeListService } from '../../services/recipe-list.service'
import { Recipe, Recipes } from '../../models/models'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  breakpoint: number;
  loading:boolean = false

  constructor(private recipeListService: RecipeListService) { 
    recipeListService.recipesList$.subscribe((recipes: Recipe[]) => {  
      this.recipes = recipes;
      this.loading = false
      console.log(this.recipes)
    })
  }

  ngOnInit() {
    this.breakpoint = 4;
    this.loading = true;
    this.recipeListService.getRecipes()
  }

  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.breakpoint = 1
    } else if (event.target.innerWidth >= 768 && event.target.innerWidth <= 959) {
      this.breakpoint = 2
    } else {
      this.breakpoint = 4
    }
  }

}
