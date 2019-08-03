# Upgrade Guide

This guide will walk through the process of how the [BusSchdeule](README.md) web application has been upgraded from Angular 4 to Angular 8. Additionally, as part of the upgrade process, [NgRx](https://ngrx.io/) has been added and introduced into the web application in order to better maintain application state, providing a better end-user experience.

### Why Upgrade?

Since Angular 4.x a lot of improvements have been made to the Angular compiler to make it faster, as well as general improvements to the Angular framework and it's core features: such as a better networking module, an improved build system, and richer command-line interface that allows for easier generation of components, modules, and additional development improvements.

### Why NgRx?

[NgRx](https://ngrx.io/) introduces _reactive programming_ into an Angular application. _Reactive programming_ is a way for applications to handle events and data flow in applications. With reactive programming, instead of pushing data directly to components or services that need it, the component or service reacts to when data changes.

## Upgrading to Angular 8

