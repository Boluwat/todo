const Hapi = require("@hapi/hapi");
const registeredBaseRoutes = require('./utils/registeredBaseRoute')

async function startServer({ services } = {}) {
  try {
    const server = new Hapi.Server({
      port: 3040,
      host: "localhost",
    });
    server.app.services = services;
    registeredBaseRoutes(server)
    await server.start();
    console.log(`server start at ${server.info.port}....`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  startServer,
};
