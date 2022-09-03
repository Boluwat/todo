const { startServer } = require("./app");
const { initDb } = require("./utils/database");

async function setup() {
  try {
    await initDb();
    const { createServices } = require("./services/service.factory");
    const services = createServices();
    await startServer({
      services,
    });
  } catch (err) {
    console.log(err);
  }
}

setup();
