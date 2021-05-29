const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");


const app = express();
const User = require("./models/User");
require("dotenv").config();

const PORT = 8090;

app.use(cors());
app.use(bodyParser.json());


const URL = 'mongodb+srv://vihanga:malisha1996@applicationframeork.q7rvl.mongodb.net/ICAF?retryWrites=true&w=majority';

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection is success")
})

const UserRouter = require("./routes/users.js");


app.use("/user",UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT} `)
})
