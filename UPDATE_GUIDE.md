#  Update Guide

This guide walks-through the process of updating the [BusSchedule](README.md) web application from Angular 4 to Angular 8. As part of the update process, [NgRx](https://ngrx.io/) has been introduced and integrated in order to better maintain application state.

## Updating Angular Versions

Angular provides an online updating guide that provides a list of steps needed to take in order to update [from Angular 4 to Angular 8](https://update.angular.io/#4.0:8.0).

While the guide _does not_ recommend updating across multiple major versions, the steps generated from Angular's update guide were followed during the update in addition to the following steps:

1. Using a new sample Angular 8 project to re-align existing npm package dependency versions for dependencies present across both projects.
2. Packages `@angular/cdk`, `tslib`, and `@angular-devkit/build-angular` were added that facilitate Angular 8 but were not present in the existing project.
3. Terminal command `ng update` was run to re-scaffold the existing project to match Angular 8's specifications.
4. Update `angular-2-local-storage` from `1.0.1` to `3.0.1` in order to compile alongside the rest of the updated dependencies.
5. Refactor services using `Http` to align with the updated `HttpClient` (from `@angular/common/http`).
6. Refactor `rxjs` imports to align with the updated version.

### Angular Material
The existing version of [Angular Material](https://material.angular.io/)  (`2.0.0-beta.6`) was drastically changed as Angular Material updated. Several steps were taken to align Angular Material with the updated version (`8.1.2`).

1. `AngularMaterialModule` created in the root app folder (`/src/app/material.module.ts`). This module `imports` and `exports` individual Angular Material components used within BusSchedule.
2. Modules requiring components from Angular Material updated to include `AngularMaterialModule` import dependency.
3. HTML elements starting with `md` changed to start with `mat` to align with updated Angular Material specifications.
4. Material menu icon residing in `<bus-root>` updated to address styling issues.


## Integrating NgRx

[NgRx](https://ngrx.io/) introduces _reactive programming_ into an Angular application. Reactive programming is a way for applications to handle events and data flow in applications. With reactive programming, instead of pushing data directly to components or services that need it, the component or service reacts to when data changes.

NgRx implements the [Redux pattern](https://dev.to/hemanth/explain-redux-like-im-five) using Observables to simplify application state to plain objects. With NgRx, application state is updated by a series of _Actions_, _Reducers_, and _Effects_.

Actions are commands that are _dispatched_ by components (or services). Dispatched Actions pass information to _Reducers_ which update application state. Should any side-effect logic need to be run in conjunction with the completion of an Action, _Effects_ are defined.

The combination of Actions, Reducers, Effects, and (application_ State colloquially refered to as a _store_. Frequently, application state is split into _slices_, each slice representing a logical portion of a whole application state.

### Integration Steps

NgRx was integrated post-Angular update by running the Angular CLI command `ng add @ngrx/store`. This command scaffolds an empty app store.

In order to add side-effects to the store's Actions, the package `@ngrx/effects` was added to BusSchedule.

### Defining Application State

BusSchedule has three logical areas that can be identified as slices of the total application state:

1. Route Information
2. Vehicle Location Information
3. Route Options*

Post-NgRx implementation, the application state is defined of `RouteState` and `VehicleLocationsState`.

*The decision to forgo adding route options to the application state is addressed below.

### NgRx Benefits

By utilizing NgRx we are afforded the following benefits:

1.

---


### Why Update?
9. Document @ngrx folder structure best practices
10. Mention barrels
11. Refactor App Component to remove references to services
12. Service tests are now pure, no service-level variables are used as dependencies.
13. Use folder structuring based off NgRX best practice (to make it my own).
14. Reduce services out of most components to replace with actions.


TODO:
1. Update tests

Angular provides an [update guide](https://update.angular.io/#4.0:8.0) that has been followed to update BusSchedule from Angular 4 to Angular 8. Below are a list of steps that were taken to update the application.

**Development Note:** Please ensure to re-run the `npm install` the existing Angular 4 version of BusSchedule resides locally on your machine.


### Steps Taken

1. `HttpModule` and the `Http` service have been switched to `HttpClientModule` and the `HttpClient` service. `HttpClient` reduces boiler-plate code (no need to map to JSON anymore) and supports typed return values and interceptors. ([Additional information on `HttpClient`](https://angular.io/guide/http)) TODO!