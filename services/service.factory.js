const { taskServices } = require(".");

const createServices = () => ({
  tasks: taskServices(),
});

module.exports = {
  createServices,
};
