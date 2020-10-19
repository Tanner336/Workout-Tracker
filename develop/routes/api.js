const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};

const router = require("express").Router();
const Workout = require("../models/workout.js");
​
router.post("/api/workouts", (req, res) => {
  Workout.create({});
​
});
​
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate();
});
​
router.get("/api/workouts", (req, res) => {
  Workout.find();
});
​
router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7);
});
​
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id);
});
​
module.exports = router;
