require("dotenv").config(); // parses contents of .env file, and assigns the values to process.env.

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require('cors');

const mongoString = process.env.DATABASE_URL; //get the mongoDB connection string from our .env file

mongoose.connect(mongoString); //use mongoose to establish connection to mongoDB
const database = mongoose.connection; //database now holds the connection object created by mongoose.connect(). We'll use this to communicate with the database

database.on("error", (error) => {
  //database.on attaches an event handler to the specified event. The handler will be called every time the event is emitted.
  console.log(error);
});

database.once("connected", () => {
  //database.once attaches an event handler to the specified event. The handler will be called only the first time the event is emitted. After the event is handled once, the handler is automatically removed.
  console.log("Database Connected");
});

const app = express();

app.use(cors());
app.use(express.json()); //when receiving req's with a JSON payload, parse the payload and populate the req.body property with the parsed object
app.use("/api", routes); //use the endpoints defined in routes to handle requests going to this endpoints, starting with /api
app.listen(3000, () => {
  console.log("Server Started at ${3000}");
});
