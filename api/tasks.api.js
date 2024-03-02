const Joi = require("joi");
const { taskControllers } = require("../controllers");
const configs = require('config')
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
            task: Joi.string().required(),
            completed: Joi.boolean(),
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
            completed: Joi.boolean(),
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
            task: Joi.string().optional(),
            completed: Joi.boolean().optional(),
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
