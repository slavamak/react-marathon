import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_DB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DB_APP_ID
};

const database = {
  instance: null,
  data: null,
  init() {
    firebase.initializeApp(firebaseConfig)
    this.instance = firebase.database();
  },
  get: async () => {
    const data = await database.instance.ref('/cards').once('value').then(res => res.val());
    return data;
  },
  set: async (array) => {
    await database.instance.ref('/cards').set(array, error => error ? console.log(error) : console.log('Success!'));
  }
};

database.init();

export default database;