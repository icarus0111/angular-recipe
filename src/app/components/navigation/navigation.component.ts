import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  title: string = 'Simple Recipes';

  @Output() isRecipeOpened = new EventEmitter<boolean>();
  @Output() isMenuOpened = new EventEmitter<boolean>();
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private navigationService: NavigationService) {}

  openDialog() {
    this.isRecipeOpened.emit();
  }

  toggleMenu () {
    this.isMenuOpened.emit();
  }
}
