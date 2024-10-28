const { Task } = require("../models/task");
const { isValidObjectId } = require("mongoose");
const moment = require('moment')

module.exports = {
  taskServices() {
    return {
      async create(payload) {
        try {
          payload.dueDate = moment(payload.dueDate).format('MMMM Do YYYY, h:mm:ss a');
          await Task.create(payload);
          return { Tasks: payload };
        } catch (error) {
          console.log(error);
        }
      },
      async getAll({ offset = 0, limit = 100, status } = {}) {
        const query = {};
        if (status) {
          query.status = status;
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
          payload.dueDate = moment(payload.dueDate).format('MMMM Do YYYY, h:mm:ss a');
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
