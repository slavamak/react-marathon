import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_DB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DB_APP_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig)

    this.auth = firebase.auth();
    this.database = firebase.database();

    this.userUid = null;
  }

  setUserUid = (uid) => this.userUid = uid;

  signInWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  createUserWithEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);
}

export default Firebase;