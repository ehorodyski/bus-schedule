#  Update Guide

This guide walks-through the process of updating the [BusSchedule](README.md) web application from Angular 4 to Angular 8. As part of the update process, [NgRx](https://ngrx.io/) has been introduced and integrated in order to better maintain application state.

## Updating Angular Versions

While Angular's official update guide **does not** recommend updating across multiple major versions, BusSchedule has been updated from Angular 4 to Angular 8. In order to successfully update Angular versions, a combination of a sample Angular 8 project was used in conjunction with the update steps provided by the [Angular Update Guide](https://update.angular.io/#4.0:8.0).

Specific steps taken on BusSchedule are as follows:

1. Using a new sample Angular 8 project, re-align existing npm package dependency versions for dependencies present across both projects.
2. Packages `@angular/cdk`, `tslib`, and `@angular-devkit/build-angular` were added that facilitate Angular 8 but were not present in the existing project.
3. Terminal command `ng update` was run to re-scaffold the existing project to match Angular 8's specifications.
4. Update `angular-2-local-storage` from `1.0.1` to `3.0.1` in order to compile alongside the rest of the updated dependencies.
5. Packages `timers` and `stream` were added as they are required for `xml2js` and `sax` respectively.
6. Refactor services using `Http` to align with the updated `HttpClient` (from `@angular/common/http`).
7. Refactor `rxjs` imports to align with the updated version.

### Angular Material

Re-aligning [Angular Material](https://material.angular.io/) with it's updated library required several steps:

1. `AngularMaterialModule` created in the root app folder (`/src/app/material.module.ts`). This module `imports` and `exports` individual Angular Material components used within BusSchedule.
2. Modules requiring components from Angular Material updated to include `AngularMaterialModule` import dependency.
3. HTML elements starting with `md` changed to start with `mat` to align with updated Angular Material specifications.
4. Material menu icon residing in `<bus-root>` updated to address styling issues.


## NgRx

[NgRx](https://ngrx.io/) enables reactive extensions for Angular. NgRx implements the Redux pattern using RxJS observables. By implementing the Redux pattern, components and other pieces of software _react_ to changes in data instead of asking for changes.

The main purpose to using NgRx is to provide a predictable state container, based on three main principles:

1. **Single Source of Truth** - State is handled in one object and one place, making debugging or  making modifications easier.
2. **Read-Only State** - State is never directly changed. Instead, actions are dispatched to a centralized location where changes are made.
3. **State is Changed by Pure Functions** - State in NgRx is immutable. When these pure functions (reducers) changes something in the state, a new state object is returned.

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
4. A solution for concurrent data modification by multiple actors

### Integration Steps

NgRx was integrated post-Angular update by running the Angular CLI command `ng add @ngrx/store`. This command scaffolds an empty app store.

In order to add side-effects to the store's Actions, the package `@ngrx/effects` was added to BusSchedule.


## BusSchedule Store

Two data "slices" constitute the total BusSchedule application state: `RoutesState` and `VehicleLocationState`. Notably missing from BusSchedule's store is any "Route Options" functionality. The rationale to exclude Route Options from the store can be found below after each slice's documented section.

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

---


NgRx implements the [Redux pattern](https://dev.to/hemanth/explain-redux-like-im-five) using Observables to simplify application state to plain objects. With NgRx, application state is updated by a series of _Actions_, _Reducers_, and _Effects_.

Actions are commands that are _dispatched_ by components (or services). Dispatched Actions pass information to _Reducers_ which update application state. Should any side-effect logic need to be run in conjunction with the completion of an Action, _Effects_ are defined.

The combination of Actions, Reducers, Effects, and (application_ State colloquially refered to as a _store_. Frequently, application state is split into _slices_, each slice representing a logical portion of a whole application state.



### Defining Application State

BusSchedule has three logical areas that can be identified as slices of the total application state:

1. Route Information
2. Vehicle Location Information
3. Route Options*

Post-NgRx implementation, the application state is defined of `RouteState` and `VehicleLocationsState`.

*The decision to forgo adding route options to the application state is addressed below.

Not to create state for Route Options:
1. Storage is a synchronous action, initialized during app startup. If we moved it into an action, we would, by Best Practice, want to initialize storage OUTSIDE of the Route Options constructor, which creates overhead.
2. Because storage is synchronous, there is no benefit to making it asyncronous. Hide/showing routes will not fail therefore there is no added benefit to adding it to the store state.
2. The route-item component relies on determining if the current route should be shown by returning a boolean. By using store we would dispatch an action, or have to select the state of all stored locations and filter through the list ourselves.
3. Actions like hide and show route would need effects to call `setRouteVisibility`, which is unneeded overhead.
4. There are several calls to `shouldDisplayRoute` within components. If we moved this functionality to the store, we would lose the syncrhonous nature.


https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/



Here is a suggestion: unless you have a concurrent data modification scenario, consider starting to build your application with some plain RxJs services, leveraging local services and the dependency injection system.

Then if the need arises, we can always refactor part of the application into a store if a use case comes up.

On the other hand if we have a concurrent data modification scenario in a part of our application, we might as well use a store from the beginning, because that is a great solution for that situation.

vehicle-location-map
 // TODO: We do not want to turn this portion into store. Why?
    //       0. We are creating markers for all possible
    //       1. GoogleMaps is finicky
    //       2. shouldDisplayRoute is called hundreds of times
    //       3. Ultimately, creates unneeded overhead.

route-item
    //// TODO: This is a place where we would NOT want to run an action, since they do not return anything.



Unidirectional Data Flow

```
├── app
 │ ├── app-routing.module.ts
 │ ├── app.component.css
 │ ├── app.component.html
 │ ├── app.component.ts
 │ ├── app.module.ts
 │ ├── components
 │ ├── containers
 │ │    └── my-feature
 │ │         ├── my-feature.component.css
 │ │         ├── my-feature.component.html
 │ │         └── my-feature.component.ts
 │ ├── models
 │ │    ├── index.ts
 │ │    └── my-model.ts
 │ │    └── user.ts
 │ ├── root-store
 │ │    ├── index.ts
 │ │    ├── root-store.module.ts
 │ │    ├── selectors.ts
 │ │    ├── state.ts
 │ │    └── my-feature-store
 │ │    |    ├── actions.ts
 │ │    |    ├── effects.ts
 │ │    |    ├── index.ts
 │ │    |    ├── reducer.ts
 │ │    |    ├── selectors.ts
 │ │    |    ├── state.ts
 │ │    |    └── my-feature-store.module.ts
 │ │    └── my-other-feature-store
 │ │         ├── actions.ts
 │ │         ├── effects.ts
 │ │         ├── index.ts
 │ │         ├── reducer.ts
 │ │         ├── selectors.ts
 │ │         ├── state.ts
 │ │         └── my-other-feature-store.module.ts
 │ └── services
 │      └── data.service.ts
 ├── assets
 ├── browserslist
 ├── environments
 │ ├── environment.prod.ts
 │ └── environment.ts
 ├── index.html
 ├── main.ts
 ├── polyfills.ts
 ├── styles.css
 ├── test.ts
 ├── tsconfig.app.json
 ├── tsconfig.spec.json
 └── tslint.json
 ```


### Why Update?
9. Document @ngrx folder structure best practices
10. Mention barrels
11. Refactor App Component to remove references to services
12. Service tests are now pure, no service-level variables are used as dependencies.
13. Use folder structuring based off NgRX best practice (to make it my own).
14. Reduce services out of most components to replace with actions.
15. We would still be reliant on using RouteOptions service calls, unless we stored all selected routes in store -- which we might want to do...

TODO:
1. Update tests
