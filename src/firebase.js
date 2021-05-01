import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCPFMfbf6G5hvhQ-fER-TZwtmYOUI7C7fI",
  authDomain: "fir-task-82b0d.firebaseapp.com",
  databaseURL: "https://fir-task-82b0d-default-rtdb.firebaseio.com",
  projectId: "fir-task-82b0d",
  storageBucket: "fir-task-82b0d.appspot.com",
  messagingSenderId: "334772422026",
  appId: "1:334772422026:web:d858a791f7d38cca5c3473",
};
// Initialize Firebase
// const fireDb = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

export const db = firebase.database().ref();
export const auth = firebase.auth();


