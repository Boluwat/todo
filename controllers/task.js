const { error } = require("../utils/error");

const create = async (request) => {
  const task = request.payload;
  const response = await request.server.app.services.tasks.create(task);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const getAll = async (request) => {
  const { offset, limit, completed } = request.query;
  const result = await request.server.app.services.tasks.getAll({
    offset,
    limit,
    completed,
  });
  const response = {
    count: result.value ? result.value.length : 0,
    totalCounts: result.totalCounts,
    taks: result.value,
  };
  return response;
};

const getTask = async (request) => {
  const { id } = request.params;
  const value = await request.server.app.services.tasks.getById(id);
  if (value.error) {
    return error(404, value.error);
  }
  return value;
};

const update = async (request) => {
  const task = request.payload;
  const { id } = request.params;
  if (Object.keys(task).length === 0 && task.constructor === Object) {
    return error(400, "payload is empty");
  }
  const response = await request.server.app.services.tasks.update(task, id);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

const deleteTask = async (request) => {
  const { id } = request.params;
  const response = await request.server.app.services.tasks.delete(id);
  if (response.error) {
    return error(400, response.error);
  }
  return response;
};

module.exports = {
  deleteTask,
  update,
  getAll,
  getTask,
  create,
};
