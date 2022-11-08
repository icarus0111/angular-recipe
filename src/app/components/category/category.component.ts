import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../services/category.service'
import { Category, CategoryList } from '../../models/models'
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RecipeListService } from 'src/app/services/recipe-list.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: CategoryList[];
  searchValue: string;
  timerCheck: any;
  submitted: boolean = false;

  constructor(private recipeListService: RecipeListService, private categoryService: CategoryService, private ref: ChangeDetectorRef) { 
    recipeListService.recipesList$.subscribe(() => {
      this.submitted = false;
    })
  }
  
  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: Category) => {
      this.categories = data.docs;
    })
  }

  updateRecipe(category) {
    this.submitted = true;
    this.recipeListService.getRecipes({
      query: {
        category: category
      },
      sortBy: "title"
    });
  }

  updateCategoryList (event) {
    clearTimeout(this.timerCheck)
    this.timerCheck = setTimeout(() => {
      this.submitted = true;
      this.categoryService.getCategories({
        query: {
          title: { $regex: event.target.value, $options: 'i' }
        },
        sortBy: "title"
      }).subscribe((data: Category) => {
        this.submitted = false;
        this.categories = data.docs;
        this.ref.detectChanges();
      })
    }, 250)
  }
}
