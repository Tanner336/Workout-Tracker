const router = require("express").Router();
const Workout = require("../models/workout.js");

router.route("/api/workouts").post((req, res) => {
  Workout.create({});
});

router.route("/api/workouts/:id").put(({ body, params }, res) => {
  Workout.findByIdAndUpdate();
});

router.route("/api/workouts").get((req, res) => {
  Workout.find();
});

router.route("/api/workouts/range").get((req, res) => {
  Workout.find({}).limit(7);
});

router.route("/api/workouts").delete(({ body }, res) => {
  Workout.findByIdAndDelete(body.id);
});

module.exports = router;

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
