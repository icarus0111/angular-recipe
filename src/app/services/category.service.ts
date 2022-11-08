import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryList } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  @Output() categoriesList$: EventEmitter<CategoryList[]> = new EventEmitter();

  baseUrl: String = "https://simple-recipe-demo-api.herokuapp.com"
  constructor(private httpClient : HttpClient) {}

  getCategories(data = {
    query: {},
    sortBy: "title"
  }) {
    const vm = this;
    const category = this.httpClient.post(`${this.baseUrl}/category`, data)
    category.subscribe((data: Category) => {
      const category:CategoryList[] = data.docs;
      vm.categoriesList$.emit(category)
    })

    return category;
  }

  createCategory(data = {
    query: {},
    sortBy: "title"
  }) {
    return this.httpClient.post(`${this.baseUrl}/category/create`, data);
  }

  updateCategory(id, data = {
    query: {},
    sortBy: "title"
  }) {
    return this.httpClient.put(`${this.baseUrl}/category/${id}`, data);
  }

  deleteCategory(id) {
    return this.httpClient.delete(`${this.baseUrl}/category/${id}`);
  }
}
