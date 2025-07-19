const dotenv = require("dotenv");
dotenv.config("./.env");
const connection = require("./config/connection");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/auth", require("./routes/authRoutes"));
app.use("/student", require("./routes/studentRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`port is running at ${process.env.PORT}`);
});
