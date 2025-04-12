const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

require("dotenv").config();

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/events", require("./routes/eventsRouter"));

app.use("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
