const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv =require("dotenv");

const app = express();
require("dotenv").config();
<<<<<<< HEAD
=======
const PORT = process.env.PORT || 8070;
>>>>>>> b8a665f534fc635670b2f9575a021781d8949729

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
<<<<<<< HEAD
})

=======
});
//mongodb connection
>>>>>>> b8a665f534fc635670b2f9575a021781d8949729
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connection success!");
})
<<<<<<< HEAD

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
=======
//import routes
const eventRouter = require("./routes/events.js");
const workshopRouter = require("./routes/workshops.js");

const reviweRouter = require("./routes/reviwers.js");
const researchreviweRouter = require("./routes/researchroute.js");
const proposalreviweRouter = require("./routes/proposalroute.js");
const addUserRouter = require("./routes/userRoutes");
const researchdocroutes = require("./routes/researchdetailsroute");
const proposaldocroutes = require("./routes/proposaldetailsroute");

server.use("/event",eventRouter);
server.use("/workshop",workshopRouter);

server.use("/reviwer",reviweRouter);
server.use("/researchreviwe",researchreviweRouter);
server.use("/proposalreviwe",proposalreviweRouter);
server.use("/user", addUserRouter);
server.use("/researchdoc", researchdocroutes);
server.use("/proposaldoc", proposaldocroutes);
>>>>>>> b8a665f534fc635670b2f9575a021781d8949729

