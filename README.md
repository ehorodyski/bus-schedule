# BusSchedule

[![Build Status][travis-badge]][travis-badge-url]

This is a demo application being written as a project to present in an interview. At this point, it does the following

- Displays the location of vehicles for selected sf-muni routes
- Defaults to having no routes selected (I had it with ALL but that was obnoxious)
- Refreshes the locations every 15 seconds

Posible improvements:

- ~~Persist selected routes to local storage~~ (Done)
- Different colors for different routes
- A select/unselect all checkbox
- Filtering of the routes in the selector
- ~~Better transition of markers when a vehicle moves~~ (Sort of done - animated placement of new markers)
- Allow for selection of a different agency
- I may think of other stuff...

## Running Local

Standard workflow:

- `npm i`
- open three terminals, run one command in each:
  - `npm test`
  - `npm start`
  - `npm run lint`
- [http://localhost:4200/](http://localhost:4200/)

## Deploying to Github Pages

Build, then deploy:

- `ng build --prod --base-href "/bus-schedule/"`
- `cp dist/index.html dist/404.html`
- `ngh --message='chore: deploy version x.y.z'`

For more information, see [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages)

I currently have it [deployed](http://ngrx-bus-schedule.s3-website-us-east-1.amazonaws.com/). Note that you have to allow loading of unsafe scripts in order for it to actually work currently. This is due to how the data is served. It could be solved by the data being served via HTTPS instead of HTTP.


[travis-badge]: https://travis-ci.org/kensodemann/bus-schedule.svg?branch=master
[travis-badge-url]: https://travis-ci.org/kensodemann/bus-schedule
