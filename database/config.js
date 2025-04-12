const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Database connected");
  } catch (error) {
    

    console.error("Error connecting to database:", error.message);
    throw new Error("Error initializing database connection");
  }
};

module.exports = {
  dbConnection,
};
