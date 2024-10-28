const Joi = require("joi");
const { taskControllers } = require("../controllers");
const configs = require("config");
const namespace = require("hapijs-namespace");

module.exports = (server, prefix) => {
  namespace(server, prefix, [
    {
      method: "Post",
      path: "/",
      config: {
        description: "create a task",
        cors: configs.cors,
        tags: ["api", "tasks"],
        validate: {
          payload: Joi.object({
            description: Joi.string().required(),
            pirority: Joi.string().valid("Medium", "High", "Low").required(),
            dueDate: Joi.string().required(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: taskControllers.create,
      },
    },
    {
      method: "Get",
      path: "/",
      config: {
        description: "get all task",
        cors: configs.cors,
        tags: ["api", "tasks"],
        validate: {
          query: Joi.object({
            limit: Joi.number(),
            offset: Joi.number(),
            status: Joi.string().valid("In Progress", "Complete", "Pending"),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: taskControllers.getAll,
      },
    },
    {
      method: "Get",
      path: "/{id}",
      config: {
        description: "get a task by id",
        cors: configs.cors,
        tags: ["api", "tasks"],
        validate: {
          params: Joi.object({
            id: Joi.string().required().min(24).max(24),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: taskControllers.getTask,
      },
    },
    {
      method: "Put",
      path: "/{id}",
      config: {
        description: "update a task",
        cors: configs.cors,
        tags: ["api", "tasks"],
        validate: {
          params: Joi.object({
            id: Joi.string().required().min(24).max(24),
          }),
          payload: Joi.object({
            description: Joi.string(),
            pirority: Joi.string().valid("Medium", "High", "Low"),
            dueDate: Joi.string(),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: taskControllers.update,
      },
    },
    {
      method: "Delete",
      path: "/{id}",
      config: {
        description: "delete a task by id",
        cors: configs.cors,
        tags: ["api", "tasks"],
        validate: {
          params: Joi.object({
            id: Joi.string().required().min(24).max(24),
          }),
          failAction: async (request, h, err) => {
            throw err;
          },
        },
        handler: taskControllers.deleteTask,
      },
    },
  ]);
};
