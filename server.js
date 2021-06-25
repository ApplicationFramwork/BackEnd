const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv =require("dotenv");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connection success!");
})

app.listen(PORT, ()=>{
    console.log("Server is up and running")
})

const reviweRouter = require("./routes/reviwers.js");
const researchreviweRouter = require("./routes/researchroute.js");
const proposalreviweRouter = require("./routes/proposalroute.js");
const addresearchRouter = require("./routes/AddResearchroute.js");
const addUserRouter = require("./routes/userRoutes");
const researchdocroutes = require("./routes/researchdetailsroute");
const proposaldocroutes = require("./routes/proposaldetailsroute");

app.use("/reviwer",reviweRouter);
app.use("/researchreviwe",researchreviweRouter);
app.use("/proposalreviwe",proposalreviweRouter);
app.use("/addresearch",addresearchRouter);
app.use("/user", addUserRouter);
app.use("/researchdoc", researchdocroutes);
app.use("/proposaldoc", proposaldocroutes);

