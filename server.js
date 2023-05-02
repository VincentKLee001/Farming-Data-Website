const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uri = "mongodb+srv://vincentlee001:komong@farmingdata.yiemgvm.mongodb.net/TestFarmingData?retryWrites=true&w=majority";
const testData = new Schema({
  name: String,
  Expected: Number,
  Measured: Number
}, {collection: "SensorTestData"});
const Data = mongoose.model("Data", testData);

var bodyParser = require('body-parser');
var cors = require("cors");
var database;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let surveys = {};

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

  } catch(error) {
    console.log(error);
  }
};

connect();

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/express_backend/test', async (req, res) => {
  const data = await Data.find();
  res.send(data);
});


// POST route
app.post('/express_backend', (req, res) => {
  surveys[req.body.name] = [];
  surveys[req.body.name].push(req.body.data);
  console.log(surveys);
  res.redirect("/express_backend");
});
