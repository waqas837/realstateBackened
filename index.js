import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
//const express = require('express'); // 1 - with latest npm we can use import statments
// go in package.json and add type: module
// Step 2 ------------>>>>>>>> Routing
import Routes from "./server/route.js";

const app = express(); // we need to do this with every express application to initilise it with app and then we run
// it as a fuction

// To handle HTTP POST requests in Express.js version 4 and above, you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let myassets = path.join(__dirname, "uploads");
app.use("/uploads", express.static(myassets));
// Step 2 ------------------->
app.use("/posts", Routes);
app.get("/", (req, res) => {
  res.send({ success: true, message: "backend is working" });
});
// https://www.mongodb.com/cloud/atlas
// const USERNAME = process.env.USERNAME;
// const PASSWORD = process.env.PASSWORD;

// const URL = process.env.DB || "mongodb+srv://mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const URL = "mongodb://127.0.0.1:27017/myFirstDatabase";
const URL = "mongodb+srv://waqasKhan:bughlani1122@cluster0.agwp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const dotenv = require('dotenv'); //3 - but we need to tell express where to pick this port
// It allows you to seperate your crediantials when we work in a collaborative environment
const PORT = process.env.PORT || "8080"; //2 - get the port from env file, if not available pick 8080

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("crud-app/build"));
// }

mongoose
  .connect(URL)
  .then(() => {
    // we need .then becausew
    //it returns a promise
    console.log("mongodb is connected");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
// We can do something like this or we can set it directly in the url as well
// mongoose.set('useFindAndModify', false);
