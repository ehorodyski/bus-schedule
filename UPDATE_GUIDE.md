#  Update Guide

This guide walks-through the process of updating the [BusSchedule](README.md) web application from Angular 4 to Angular 8. As part of the update process, [NgRx](https://ngrx.io/) has been introduced and integrated in order to better maintain application state.

## Updating Angular Versions

While Angular's official update guide **does not** recommend updating across multiple major versions, BusSchedule has been updated from Angular 4 to Angular 8. In order to successfully update Angular versions, a combination of a sample Angular 8 project was used in conjunction with the update steps provided by the [Angular Update Guide](https://update.angular.io/#4.0:8.0).

Specific steps taken on BusSchedule are as follows:

1. Using a new sample Angular 8 project, re-align existing npm package dependency versions for dependencies present across both projects.
2. Packages `@angular/cdk`, `tslib`, and `@angular-devkit/build-angular` have been added as they are dependencies of Angular 8 but were not present in the existing project.
3. Terminal command `ng update` was run to re-scaffold the existing project to match Angular 8's specifications.
4. Update `angular-2-local-storage` from `1.0.1` to `3.0.1` in order to compile alongside the rest of the updated dependencies.
5. Packages `timers` and `stream` were added as they are required for `xml2js` and `sax` respectively.
6. Refactor services using `Http` to align with the updated `HttpClient` (from `@angular/common/http`).
7. Refactor `rxjs` imports to align with the updated version.

### Angular Material

Re-aligning [Angular Material](https://material.angular.io/) with it's updated library required several steps:

1. `AngularMaterialModule` created in the root app folder (`/src/app/material.module.ts`). This module `imports` and `exports` individual Angular Material components used within BusSchedule.
2. Application modules requiring components from Angular Material updated to include `AngularMaterialModule` import dependency.
3. HTML elements starting with `md` changed to start with `mat` to align with updated Angular Material specifications.
4. Material menu icon residing in `<bus-root>` updated to address styling issues.


## Integrating NgRx

[NgRx](https://ngrx.io/) enables reactive extensions for Angular. NgRx implements the Redux pattern using RxJS observables. By implementing the Redux pattern, components and other pieces of software _react_ to changes in data instead of asking for changes.

The main purpose to using NgRx is to provide a predictable state container, based on three main principles:

1. **Single Source of Truth** - State is handled in one object and one place, making debugging or  making modifications easier.
2. **Read-Only State** - State is never directly changed. Instead, actions are dispatched to a centralized location where changes are made.
3. **State is Changed by Pure Functions** - State in NgRx is immutable. When these pure functions (reducers) change something in the state, a new state object is returned.

### Terminology and Concepts

* **Store** - The state of your application; the only thing modified by dispatching actions to it.
* **Reducer** - The pure functions that take previous state from your store, run a pure function against it, and adds a new state to the store.
* **Actions** - The action to be dispatched; essentially an action type and a payload of data to use in a reducer.
* **Effects** - Middleware that performs side-effects once an action has been completed.
* **Selectors** - Pure functions that take slices of state as arguments and return some state data that can be accessed by components and other pieces of software.

### Benefits

When utilizing NgRx as a store solution, the following benefits are provided:

1. An Observable-like pattern for decoupled component interaction.
2. A client container for temporary UI state.
3. A cache provided for avoiding excessive HTTP requests.
4. A solution for concurrent data modification by multiple actors.

### Installation Steps

NgRx was integrated post-Angular update by running the Angular CLI command `ng add @ngrx/store`. This command scaffolds an empty app store.

In order to add side-effects to the store's Actions, the package `@ngrx/effects` was added to BusSchedule.

## BusSchedule Store

Two data "slices" constitute BusSchedule application state: `RoutesState` and `VehicleLocationState`. Notably missing from BusSchedule's store is any "Route Options" functionality. The rationale to exclude Route Options from the store can be found below after each slice's documented section.

### RoutesState

`RoutesState` consists of the following portion of application state:

* `agency` - The current bus agency BusSchedule tracks.
* `error` - A placeholder to store error messages should communication with the `routeList` data service fail.
* `loading` - A boolean indication of whether or not the application is loading data from the `routeList` data service.
* `routes` - A collection of routes cached from the result of the `routeList` data service.

The primary action `RoutesActions.refresh()`:

1. Sets the `loading` indicator to true.
2. Runs the effect `RouteEffects.refresh$`.
3. `RouteEffects.refresh$` calls `RoutesService.refresh()` to initiate a call to the `routeList` data service.
4. Once the call is completed, `RouteEffects.refresh$` will dispatch `RoutesActions.refreshSuccess()` to update `RoutesState.routes` and `RouteStates.agency`, or will dispatch `RoutesAction.refreshFailure()` to populate `RoutesState.error` with the error returned from the service call. In either case, the `loading` indicator is turned to `false`.

The selector `getRoutes` returns `Observable<Array<Route>>`.

By combining the use of `RoutesActions` and `getRoutes`, `RoutesService` is no longer a dependency in `AppComponent` nor is there a need to subcribe, then unsubscribe, to any Observables.

### VehicleLocationsState

`VehicleLocationsState` consists of the following portion of application state:

* `error` - A placeholder to store error messages should communication with the `vehicleLocations` data service fail.
* `lastTime` - A numberic representation of the last time vehicle location information was updated.
* `loading` - A boolean indication of whether or not the application is loading data from the `vehicleLocations` data service.
* `locations` - A collection of vehicle locations cached from the result of the `vehicleLocations` data service.

The primary action `VehicleLocations.refresh()`:

1. Sets the `loading` indicator to true.
2. Runs the effect `VehicleLocationsEffects.refresh$`.
      1. This effect selects `agency` and `lastTime` from application state, using selectors `getAgency` and `getLastUpdateTime`. These values are used as parameters in the next step.
3. `VehicleLocationsEffects.refresh$` calls `VehicleLocationsService.refresh()` to initiate a call to the `vehicleLocations` data service.
4. Once the call is completed, `VehicleLocationsEffects.refresh$` will dispatch `VehicleLocationsActions.refreshSuccess()` to update `VehicleLocationsState.locations` and `VehicleLocationsState.lastTime`, or will dispatch `VehicleLocationsActions.refreshFailure()` to populate `VehicleLocationsState.error` with the error returned from the service call. In either case, the `loading` indicator is turned to `false`.

The selector `getVehicleLocations` returns `Observable<Array<VehicleLocation>>`.

By combining the use of `VehicleLocationsActions` and `getVehicleLocations`, `VehicleLocationsService` is no longer a dependency in `VehicleLocationsMap`.

### Route Options (not part of store)

The portion of BusSchedule that handles Route Options is **not** a good candidate to consider moving to a Redux-based architecture (in this case, NgRx). When integrating NgRx to an existing application, it is important to note which portion(s) of functionality can benefit from this type of architecture.

To quote [Angular University](https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/):

> You’ll know when you need [NgRx]. If you aren’t sure if you need it, you don’t need it.

Routes and Vehicle Locations are two obvious candidates to use NgRx. They perform asychronous operations that benefit from being cached as part of an application state, and their actions easily lend themselves to typical NgRx side-effects, such as presenting a user with a prompt to retry an action if it failed.

While actions like hiding and showing a route appear to be prime candidates for the NgRx architecture, the majority of the "Route Options" functionality is performant enough as-is, and adding NgRx would add extra complexity:

1. Loading local storage is a syncrhonous call made by the `RouteOptionsService` constructor, initializing the user's storage during app startup. Following an NgRx architecture, an Action would be required outside of the service to load local storage into our app state, therefore losing the "automatic" loading of local storage and adding a new dependency that the app lifecycle needs to maintain.
2. NgRx is built around pure functions. In the case of showing/hiding a route using NgRx architecture, it is simple to use a pure function to update this portion of app state. However, an un-intended side-effect is that local storage needs to be updated on either of those actions. Therefore, to add showing/hiding into our app store, we would require an action for each as well as at least one Effect to handle updating local storage, which is additional overhead.
3. `shouldDisplayRoute` is a simple O(1) runtime method in `RouteOptionsService` called several times within the lifecycle of BusSchedule. Following an NgRx architecture, however `shouldDisplayRoute` is refactored, it would have to become part of an Observable stream, which beyond a development complexity also contains a higher runtime.

This is not to say that Route Options functionality cannot be migrated into our NgRx store at a later date:

Once again, from Angular University:

> [I]f the need arises, we can always [migrate] part of the application into a store if a use case comes up.

## Best Practices

In order to follow NgRx's Best Practices, BusSchedule's file structure has been updated to reflect the following (starting from `src/app`):

```
 ├── app
 │ ├── app-routing.module.ts
 │ ├── app.component.scss
 │ ├── app.component.html
 │ ├── app.component.ts
 │ ├── app.component.spec.ts
 │ ├── app.module.ts
 │ ├── material.module.ts
 │ ├── core
 │ │    └── actions
 │ │    |    ├── index.ts
 │ │    |    ├── routes.actions.ts
 │ │    |    └── vehicle-locations.actions.ts
 │ │    └── effects
 │ │    |    ├── index.ts
 │ │    |    ├── routes.effects.ts
 │ │    |    └── vehicle-locations.effects.ts
 | │    └── models
 │ │    |    ├── route.ts
 │ │    |    ├── vehicle-location.ts
 │ │    |    └── vehicle-locations-response.ts
 | │    └── reducers
 │ │    |    ├── routes.reducer.ts
 │ │    |    └── vehicle-locations.reducer.ts
 │ │    └── services
 │ │    |    ├── route-options.service.ts
 │ │    |    ├── route-options.service.spec.ts
 │ │    |    ├── routes.service.ts
 │ │    |    ├── routes.service.spec.ts
 │ │    |    ├── vehicle-locations.service.spec.ts
 │ │    |    └── vehicle-locations.service.ts
 | ├── core.module.ts
 | ├── module-import-guard.ts
 │ ├── reducers
 │ │    └── index.ts
 │ ├── shared
 │ │    └── {unchanged}
 ```