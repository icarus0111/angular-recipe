import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = false;
  isMenuOpened:Boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  createRecipe() {
    console.log("dialog")
    // this.isMenuOpened = isOpened;
    // this.dialog.open(DialogComponent, {
    //   width: '250px'
    // });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateRecipeComponent, dialogConfig);
  }
}
