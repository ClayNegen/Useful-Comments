const brain = require("brain.js");
const trainingData = require("./trainingData.json");
const testData = require("./testData.json");

console.log("Collected Data");
console.log("Test data: ", testData[0].items);

const tdata = trainingData.map((item) => ({
  input: item.title,
  output: item.category,
}));

console.log("----------------------");
console.log("Transformed into Training Data");

const network = new brain.recurrent.LSTM();

console.log("----------------------");
console.log("Built Recurrent Neural Network");

console.log("----------------------");
console.log("Training NetWork: ");

network.train(tdata, {
  iterations: 50,
  log: (error) => console.log(error),
  logPeriod: 1,
});

console.log("----------------------");

testData[0].items.forEach((input) => {
  let output = network.run(input);
  if (output === "useful") {
    console.log("Comment: ", input);
  }
});
