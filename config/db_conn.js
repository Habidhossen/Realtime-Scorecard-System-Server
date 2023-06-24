const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    "Database Connection Failed: " + err;
  });
