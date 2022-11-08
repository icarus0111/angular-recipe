export interface CategoryList {
  _id: string,
  title: string,
  description: string,
  image: Image
}

export interface Category {
  limit: number,
  page: number,
  pages: number,
  status: boolean,
  total: number,
  docs: CategoryList[]
}

export interface Image {
  url: string
}


export interface Recipe {
  _id: string,
  title: string,
  description: string,
  category: CategoryList,
  image: Image
}

export interface RecipeInput {
  title: string,
  description: string,
  category: string,
  // image: Image
}

export interface RecipeResponse {
  data: Recipe
}

export interface Recipes {
  limit: number,
  page: number,
  pages: number,
  status: boolean,
  total: number,
  docs: Recipe[]
}