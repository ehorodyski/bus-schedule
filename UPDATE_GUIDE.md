#  Guide

This guide will walk through the process of how the [BusSchdeule](README.md) web application has been Updated from Angular 4 to Angular 8. Additionally, as part of the update process, [NgRx](https://ngrx.io/) has been added and introduced into the application in order to better maintain application state, providing a better end-user experience.

### Why Update?

Since Angular 4 a lot of improvements have been made to the Angular compiler to make it faster, as well as general improvements to the Angular framework and it's core features: such as a better networking module, an improved build system, and richer command-line interface that allows for easier generation of components, modules, and additional development improvements.

### Why NgRx?

[NgRx](https://ngrx.io/) introduces _reactive programming_ into an Angular application. _Reactive programming_ is a way for applications to handle events and data flow in applications. With reactive programming, instead of pushing data directly to components or services that need it, the component or service reacts to when data changes.

## Upgrading to Angular 8

Angular does not advise using their online updater across multiple major versions. In order to update the app, we used a fresh angular project as a base.

1. Update Package.json
2. Run ng update
3. Update addt. dependencies

      Name                               Version                  Command to update
     --------------------------------------------------------------------------------
      @angular/cli                       8.0.6 -> 8.2.0           ng update @angular/cli
      @angular/core                      8.0.3 -> 8.2.0           ng update @angular/core
      rxjs                               6.4.0 -> 6.5.2           ng update rxjs

Angular provides an [update guide](https://update.angular.io/#4.0:8.0) that has been followed to update BusSchedule from Angular 4 to Angular 8. Below are a list of steps that were taken to update the application.

**Development Note:** Please ensure to re-run the `npm install` the existing Angular 4 version of BusSchedule resides locally on your machine.


### Steps Taken

1. `HttpModule` and the `Http` service have been switched to `HttpClientModule` and the `HttpClient` service. `HttpClient` reduces boiler-plate code (no need to map to JSON anymore) and supports typed return values and interceptors. ([Additional information on `HttpClient`](https://angular.io/guide/http)) TODO!