const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAnXUDyF-HjUZiQ64qFISsGe2SyLzb0P-o",
  authDomain: "usefu-87207.firebaseapp.com",
  databaseURL: "https://usefu-87207.firebaseio.com",
  projectId: "usefu-87207",
  storageBucket: "usefu-87207.appspot.com",
  messagingSenderId: "594351558614",
  appId: "1:594351558614:web:028882d342538729f09e77",
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;
