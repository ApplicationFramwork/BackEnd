const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = 'mongodb+srv://E5115eAa:E5115eAa@cluster0.o7oez.mongodb.net/admin_db?retryWrites=true&w=majority';

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