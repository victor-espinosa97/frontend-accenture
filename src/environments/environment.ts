// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC9Ub0DiuTDMdJ9WG0lmtZmKEJjFOuR3qY",
    authDomain: "todo-categories-5e76d.firebaseapp.com",
    projectId: "todo-categories-5e76d",
    storageBucket: "todo-categories-5e76d.firebasestorage.app",
    messagingSenderId: "834262883372",
    appId: "1:834262883372:web:00d14553d25ece1188c589"
  },
  featureFlags: {
    useCategories: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
