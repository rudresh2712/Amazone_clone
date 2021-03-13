// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// import { firebase } from '@firebase/app'
// var firebase = require('firebase/app');
const firebaseConfig = {
  apiKey: "AIzaSyAY9i7cuXhBw-ZSWqE6XtCz0ispSd-sWQ8",
  authDomain: "challenge-10e76.firebaseapp.com",
  projectId: "challenge-10e76",
  storageBucket: "challenge-10e76.appspot.com",
  messagingSenderId: "182620812779",
  appId: "1:182620812779:web:598350f0319542cc5415ae",
  measurementId: "G-4R443YHM23"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth =firebase.auth();

export {db,auth};