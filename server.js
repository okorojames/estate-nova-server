const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;
const db = require("./configs/db_config");
const routes = require("./routes/properties_routes");

// middle wares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//
app.use("/api/properties", routes);

// app listening
app.listen(PORT, () => {
  console.log("app is listening");
  db.connectDb();
});
