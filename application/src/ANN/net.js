const brain = require("brain.js");
//const data = require("./data.json");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB1Af9vXk5HuV9ygUxZaWNQJ5JYTduIYwI",
  authDomain: "usefulcomments-e0051.firebaseapp.com",
  databaseURL: "https://usefulcomments-e0051.firebaseio.com",
  projectId: "usefulcomments-e0051",
  storageBucket: "usefulcomments-e0051.appspot.com",
  messagingSenderId: "955019535522",
  appId: "1:955019535522:web:c219ac0143305f37f563fb",
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const databaseRef = db.collection("data");

let stuff = [];

const setData = async (data) => {
  let info = await data;
  stuff.push(info);
  console.log("Stuff: ", stuff);
};

let query = databaseRef
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      setData(doc.data());
    });
  })
  .catch((err) => {
    console.log("Error getting documents", err);
  });

/*
const fetchData = async () => {
  db.collection("data").onSnapshot(function (data) {
    //console.log(data.docs.map((doc) => ({ ...doc.data() })));
    console.log("poo");
  });
};

fetchData();

//console.log("Data1: ", data1);

/*
const tdata = data.map((item) => ({
  input: item.text,
  output: item.category,
}));

const net = new brain.recurrent.LSTM({ hiddenLayers: [3] });

net.train(tdata, {
  errorThresh: 0.025,
  log: (error) => console.log(error),
  logPeriod: 100,
});

const output = net.run("yes");

console.log(`Category: ${output}`);
*/
