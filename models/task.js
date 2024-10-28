const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["In Progress", "Complete", "Pending"],
    },
    pirority: {
      type: String,
      enum: ["Medium", "High", "Low"],
      required: true
    },
  },
  { timestamps: true, strict: "throw" }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = {
  Task,
};
