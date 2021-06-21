const mongoose = require("mongoose");

const db = async () => {
  await mongoose.connect(
    process.env.DB_URI,
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true },
    () => console.log("Connected to DB")
  );
};

module.exports = db;
