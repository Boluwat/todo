const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true, strict: 'throw'});

const Task = mongoose.model("Task", taskSchema);
module.exports = {
  Task,
};
