import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB58NoH_ITy3TpOHqnUc9dtKUuwX7W2xjM",
  authDomain: "chatto2021.firebaseapp.com",
  projectId: "chatto2021",
  storageBucket: "chatto2021.appspot.com",
  messagingSenderId: "1004127523821",
  appId: "1:1004127523821:web:1fbab441878ab8303f0de4",
  measurementId: "G-0HPXWY7D8N",
});

const db = firebaseApp.firestore();

export default db  ;
