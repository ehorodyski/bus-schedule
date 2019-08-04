// import { TestBed, async } from '@angular/core/testing';
// import { LocalStorageService } from 'angular-2-local-storage';

// import { AppComponent } from './app.component';
// import { AngularMaterialModule } from './material.module';
// import { CoreModule } from './core/core.module';
// import { SharedModule } from './shared/shared.module';

// class LocalStorageServiceMock {
//   get(key: string): any { return null; }
//   set(key: string, value: any): void { }
// }

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//       imports: [
//         CoreModule,
//         AngularMaterialModule,
//         SharedModule
//       ],
//       providers: [
//         { provide: LocalStorageService, useClass: LocalStorageServiceMock }
//       ]
//     }).compileComponents();
//   }));

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
// });
