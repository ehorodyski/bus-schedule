import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../material.module';
import { RouteListComponent } from './route-list.component';
import { RouteItemComponent } from './route-item/route-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports: [RouteListComponent],
  declarations: [RouteListComponent, RouteItemComponent]
})
export class RouteListModule { }
