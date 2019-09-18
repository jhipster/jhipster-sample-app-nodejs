# gen

This application was generated using the [NodeJS blueprint](https://github.com/jhipster/generator-jhipster-nodejs) of JHipster 6.3.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v6.3.0](https://www.jhipster.tech/documentation-archive/v6.3.0). For any questions you can refer to the stream lead: [Angelo Manganiello](https://github.com/amanganiello90).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install
    cd server && npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    cd server && npm start
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

### PWA Support

JHipster ships with PWA (Progressive Web App) support, and it's disabled by default. One of the main components of a PWA is a service worker.

The service worker initialization code is commented out by default. To enable it, uncomment the following code in `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: [Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker. It dynamically generates the `service-worker.js` file.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

    npm install --save --save-exact leaflet

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

    npm install --save-dev --save-exact @types/leaflet

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) file:

```
@import '~leaflet/dist/leaflet.css';
```

Note: There are still a few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using Angular CLI

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

### Using NestJS CLI

You can also use [NestJS CLI][] to generate some custom server code.

For example, the following command:

    nest generate module my-module

will generate the file:

    create server/src/my-component/my-component.module.ts

## Building and running

You can run the application using mvnw command (if you have JAVA) or the npm standard scripts

### With JAVA installed

#### Running

```bash
./mvnw clean package -Pdev
```

#### Building

```bash
./mvnw clean package -Pprod
```

### With node npm scripts

As prerequisite, before you have to build the client code:

```bash
npm build
```

#### Running

```bash
cd server && npm start
```

#### Building

```bash
cd server && npm build
```

The build folder with all compiled sources will be **server/dist**.

> For more explanation about full stack server/client build refer to **server/README.md**

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

For more information, refer to the [Running tests page][].

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.3.0 archive]: https://www.jhipster.tech/documentation-archive/v6.3.0
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.3.0/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.3.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.3.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.3.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.3.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.3.0/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[nestjs]: https://nestjs.com/
[nestjs cli]: https://docs.nestjs.com/cli/usages
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/
