import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyALJpEOBqzrZUN354zGbhlbp6o6buYTDpo",
    authDomain: "covlive-fa7b3.firebaseapp.com",
    databaseURL: "https://covlive-fa7b3.firebaseio.com",
    projectId: "covlive-fa7b3",
    storageBucket: "covlive-fa7b3.appspot.com",
    messagingSenderId: "799870256437",
    appId: "1:799870256437:web:b82029f9f4dd582b9bf87c",
    measurementId: "G-67WTWTN15D"
  };
const firebaseapp = Firebase.initializeApp(firebaseConfig);

export default database = firebaseapp.firestore();