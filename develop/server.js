const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Workout = require("./models/workout")

const apiRoutes = require("./routes/api.js");
const viewRoutes = require("./routes/view.js");

const seed = require("./seeders/seed")


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useFindAndModify: false
});

Workout.create(seed)
  .then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error)
  })

app.use(apiRoutes);
app.use(viewRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
});
