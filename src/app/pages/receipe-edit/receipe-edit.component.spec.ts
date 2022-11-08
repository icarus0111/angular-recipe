import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeEditComponent } from './receipe-edit.component';

describe('ReceipeEditComponent', () => {
  let component: ReceipeEditComponent;
  let fixture: ComponentFixture<ReceipeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
