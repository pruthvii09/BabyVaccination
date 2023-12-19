require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const hospitalRoute = require("./routes/hospitalRoute");
const babyRoutes = require("./routes/babyRoute");
const vaccineRoute = require("./routes/vaccineRoute");
//initialize app
const app = express();

//use middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/hospital", hospitalRoute);
app.use("/api/baby", babyRoutes);
app.use("/api/vaccine", vaccineRoute);
//connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening on Port ${process.env.PORT} 🚀🚀`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
