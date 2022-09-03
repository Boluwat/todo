const { Task } = require("../models/task");
const { isValidObjectId } = require("mongoose");

module.exports = {
  taskServices() {
    return {
      async create(payload) {
        try {
          const task = await Task.create(payload);
          return { Tasks: task._id };
        } catch (error) {
          console.log(error);
        }
      },
      async getAll({ offset = 0, limit = 100, completed } = {}) {
        const query = {};
        if (completed) {
          query.completed = completed;
        }
        const totalCounts = await Task.countDocuments(query);
        const value = await Task.find(query)
          .skip(offset)
          .limit(limit)
          .sort({ createdAt: -1 });
        return { value, totalCounts };
      },
      async getById(taskId) {
        if (!isValidObjectId(taskId)) return { msg: "not found" };
        const task = await Task.findById(taskId);
        if (!task) return { error: "not found" };
        return { task };
      },
      async update(payload, id) {
        try {
          if (!isValidObjectId(id)) return { error: "not found" };
          const task = await Task.findOneAndUpdate(
            {
              _id: id,
            },
            payload,
            {
              new: true,
            }
          );
          if (!task) return { error: "not found" };
          return task;
        } catch (error) {
          console.log(error);
          return { msg: "gone bad" };
        }
      },
      async delete(taskId) {
        try {
          if (!isValidObjectId(taskId)) return { error: "not found" };
          const task = await Task.findByIdAndDelete(taskId);
          if (!task) return { error: "not found" };
          return {msg: 'task deleted'};
        } catch (error) {
          console.log(error);
          return { msg: "gone bad" };
        }
      },
    };
  },
};
