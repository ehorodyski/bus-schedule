import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MdListModule } from '@angular/material';

import { RouteItemComponent } from './route-item/route-item.component';
import { RouteListComponent } from './route-list.component';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouteItemComponent,
        RouteListComponent
      ],
      imports: [
        FormsModule,
        MatCheckboxModule,
        MdListModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
