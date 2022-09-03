module.exports = {
  mongodb: {
    url:
      process.env.DB ||
      "mongodb+srv://Boluwatife:Oyedemi14@cluster0.seu4p.mongodb.net/taskmanager?retryWrites=true&w=majority",
  },
  cors: { origin: ['*'] },
};
