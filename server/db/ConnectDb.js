const mongoose = require("mongoose");

function ConnectDb(params) {
  const dbUrl = process.env.DB_URL;
  mongoose
    .connect(dbUrl, {})
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.error("Database Connection Error");
      mongoose.disconnect();
      process.exit(1);
    });
}

module.exports = ConnectDb;
