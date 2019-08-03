import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MdListModule } from '@angular/material';

import { RouteListComponent } from './route-list.component';
import { RouteItemComponent } from './route-item/route-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MdListModule
  ],
  exports: [RouteListComponent],
  declarations: [RouteListComponent, RouteItemComponent]
})
export class RouteListModule { }
