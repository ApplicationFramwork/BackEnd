const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

//server middleware
server.use(cors());
server.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
//mongodb connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection is success")
})
//import routes
const eventRouter = require("./routes/events.js");
const workshopRouter = require("./routes/workshops.js");

server.use("/event",eventRouter);
server.use("/workshop",workshopRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT} `)
})