import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { CategoryList, RecipeResponse, Recipe, Category } from 'src/app/models/models';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() editForm: boolean = false;
  @Input() formTitle: string;
  @ViewChild('imageInput', {static: false}) imageInput: any;

  submitted: Boolean = false
  categories: CategoryList[];

  recipeId: string = null;
  recipeTitle: string = null;
  recipeDescription: string = null;
  recipeCategory: string = null;
  recipeImage: string = null;
  imageEdited: File = null;
  progress:number = 0;
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService, 
    private categoryService: CategoryService, 
    private recipeListService: RecipeListService, 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      recipeTitle: new FormControl([{value: '', disabled: true}, Validators.required, Validators.maxLength(100)]),
      recipeCategory: new FormControl([{value: '', disabled: true}, Validators.required ]),
      recipeDescription: new FormControl(['', Validators.maxLength(300) ])
   });
  }

  // convenience getter for easy access to form fields
  get f() { return this.recipeForm.controls; }

  hasError(controlName: string, errorName: string) {
    return this.recipeForm.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    if (this.editForm) {
      this.getRecipes();
    }

    this.categoryService.getCategories().subscribe((data: Category) => {
      this.categories = data.docs;
    })
  }

  fileProgress(event) {
    if (event.target.files.length > 0) {
      this.imageEdited = <File>event.target.files[0];
    }
  }

  closeModal() {
    this.recipeListService.recipeCreated$.emit();
  }

  createRecipe() {
    if (this.recipeForm.invalid) {
      alert("You have errors in the form");
    } else {
      if(!this.submitted) {
        this.submitted = true;
        const recipe = new FormData();
        recipe.append('title', this.recipeTitle);
        recipe.append('description', this.recipeDescription || '');
        recipe.append('category', this.recipeCategory);
        if (this.imageEdited) {
          recipe.append('image', this.imageEdited);
        }

        if(this.editForm) {
          this.recipeListService.updateRecipe(this.route.snapshot.params.id, recipe).subscribe((events) => {
            if(events.type == HttpEventType.UploadProgress) {
              this.progress = Math.round(events.loaded / events.total * 100)
              console.log('Upload progress: ', this.progress + '%');
            } else if(events.type === HttpEventType.Response) {
              const data = <RecipeResponse>events.body;
              if (data && data.data) {
                console.log("Recipe Updated!", data);
                this.imageInput.nativeElement.value = "";
                this.updateRecipeData(data.data);
              }
              this.submitted = false;
            }
          })
        } else {
          this.recipeListService.createRecipe(recipe).subscribe((data: RecipeResponse) => {
            if (data && data.data) {
              console.log("Recipe Updated!", data);
              this.imageInput.nativeElement.value = "";
              this.recipeListService.getRecipes();
              this.recipeListService.recipeCreated$.emit(data.data);
            }
            this.submitted = false;
          })
        }
      }
    } 
  }

  getRecipes() {
    this.recipeListService.getRecipe(this.route.snapshot.params.id).subscribe((data:RecipeResponse) => {
      if (data && data.data) {
        this.updateRecipeData(data.data);
      }
    })
  }

  deleteRecipe(id: string) {
    this.recipeListService.deleteRecipe(id).subscribe((data:RecipeResponse) => {
      if (data && data.data) {
        this.updateRecipeData(data.data);
        this.router.navigate(['/'])
      }
    })
  }

  private updateRecipeData(recipe: Recipe) {
    this.recipeId = recipe._id;
    this.recipeTitle = recipe.title;
    this.recipeDescription = recipe.description;
    this.recipeCategory = recipe.category._id;
    this.recipeImage = recipe && recipe.image && recipe.image.url;
    this.recipeService.updateRecipe(recipe);
  }
}
