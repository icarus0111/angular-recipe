import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from 'src/app/models/models';
import { RecipeListService } from 'src/app/services/recipe-list.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  @ViewChild('recipeForm', {static: false}) recipeForm: any;

  constructor(
    private dialogRef: MatDialogRef<CreateRecipeComponent>, private recipeListService: RecipeListService) {    
    recipeListService.recipeCreated$.subscribe(() => {
      this.close();
    })
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
