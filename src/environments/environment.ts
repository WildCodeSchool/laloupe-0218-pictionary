// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD7CRCqxIP65t89Mjt1g8iBU6icPROYntY',
    authDomain: 'angularpictionary.firebaseapp.com',
    databaseURL: 'https://angularpictionary.firebaseio.com',
    projectId: 'angularpictionary',
    storageBucket: 'angularpictionary.appspot.com',
    messagingSenderId: '1083049983524'
  }
};
