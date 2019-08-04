import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { reducers, metaReducers } from './reducers';
import { RoutesEffects, VehicleLocationsEffects } from './core/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularMaterialModule,
    LocalStorageModule.forRoot({
      prefix: 'bus-sched',
      storageType: 'localStorage'
    }),
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      RoutesEffects,
      VehicleLocationsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
