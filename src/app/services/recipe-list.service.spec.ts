import { TestBed } from '@angular/core/testing';

import { RecipeListService } from './recipe-list.service';

describe('RecipeListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeListService = TestBed.get(RecipeListService);
    expect(service).toBeTruthy();
  });
});
