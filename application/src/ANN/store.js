const firebase = require("firebase");
require("firebase/firestore");
fs = require("fs");

class Network {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAnXUDyF-HjUZiQ64qFISsGe2SyLzb0P-o",
      authDomain: "usefu-87207.firebaseapp.com",
      databaseURL: "https://usefu-87207.firebaseio.com",
      projectId: "usefu-87207",
      storageBucket: "usefu-87207.appspot.com",
      messagingSenderId: "594351558614",
      appId: "1:594351558614:web:028882d342538729f09e77",
    };

    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();
    this.data = [];
    this.getDataInfo();
  }

  writeData(data) {
    let write = JSON.stringify(data);
    fs.writeFile("trainingData.json", write, function (err) {
      if (err) return console.log(err);
      console.log("data > trainingData.json");
    });
  }

  getData() {
    return this.data;
  }

  async setData(data) {
    this.data = await data;
    console.log("this.data", this.data);
    this.writeData(this.data);
  }

  getDataInfo() {
    let databaseRef = this.db.collection("trainingData");
    let query = databaseRef
      .get()
      .then((snapshot) => {
        this.setData(snapshot.docs.map((doc) => ({ ...doc.data() })));
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }
}
module.exports = Network;
