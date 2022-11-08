import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeResponse } from 'src/app/models/models';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.scss']
})
export class ReceipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeListService: RecipeListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeListService.getRecipe(this.route.snapshot.params.id).subscribe((data:RecipeResponse) => {
      
      this.recipe = data.data;
    })
  }

  deleteRecipe(id: string) {
    this.recipeListService.deleteRecipe(id).subscribe((data:RecipeResponse) => {
      if (data && data.data) {
        this.router.navigate(['/'])
      }
    })
  }

}
