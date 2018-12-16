import _ from 'lodash';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let app;
let auth;
let db;
let storage;

const config = CONFIG.firebase;

if (!config || _.isEmpty(config)) {
  throw "Firebase configuration object is empty or hasn't been defined. \n\nPlease ensure the `firebase` configuration object exists and has been populated with the relevant Firebase configuration settings (these settings can be found in the Firebase console under Project Overview: https://console.firebase.google.com/project/[your-project-id]/settings/general/)\n\nPlease note: if you are using `react-project-template` these settings should be automatically loaded when your React application is started or built (please see the `scripts` folder of your React application for more information).";
}

// Initialise the application
app = firebase.initializeApp(config);

// Initialise authentication
if (config.authDomain) {
  auth = app.auth();
}

// Initialise the database
if (config.databaseURL) {
  db = app.firestore();
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);
}

// Initialise storage
if (config.storageBucket) {
  storage = app.storage();
}

export default app;

export { auth, db, storage };
