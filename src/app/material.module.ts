import { NgModule } from "@angular/core";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class AngularMaterialModule { }