const { taskApi } = require("../api");

module.exports = (server) => {
  taskApi(server, "/v1/task");
};
