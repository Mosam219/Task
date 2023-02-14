const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;
const mongoose = require("mongoose");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("database connected :)");
});
mongoose.connection.on("error", (error) => {
  console.log("database not connected some error :(", error);
});

require("./models/User.js");
require("./models/Order.js");

app.use(express.json());
const userRoute = require("./routes/user.js");
const orderRoute = require("./routes/order.js");
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
