const mongoose = require("mongoose");
const config = require("config");

const initDb = async () => {
  try {
    const mongodbUrl = config.mongodb.url;
    mongoose
      .connect(mongodbUrl, { useNewUrlParser: true })
      .then(() => console.log("connected to the databse"));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initDb };
