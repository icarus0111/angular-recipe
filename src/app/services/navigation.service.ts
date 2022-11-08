import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public isMenuOpened$: EventEmitter<Boolean>;
  constructor() {
    this.isMenuOpened$ = new EventEmitter();
  }

  isOpened: Boolean = true;

  toggleMenu () {
    this.isMenuOpened$.emit(this.isOpened = !this.isOpened);
  }
}
