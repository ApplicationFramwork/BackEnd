const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT || 8070;

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

const reviweRouter = require("./routes/reviwers.js");
const researchreviweRouter = require("./routes/researchroute.js");
const proposalreviweRouter = require("./routes/proposalroute.js");
const addUserRouter = require("./routes/userRoutes");
const researchdocroutes = require("./routes/researchdetailsroute");
const proposaldocroutes = require("./routes/proposaldetailsroute");
const paymentRouter = require("./routes/payment");


server.use("/event",eventRouter);
server.use("/workshop",workshopRouter);

server.use("/reviwer",reviweRouter);
server.use("/researchreviwe",researchreviweRouter);
server.use("/proposalreviwe",proposalreviweRouter);
server.use("/user", addUserRouter);
server.use("/researchdoc", researchdocroutes);
server.use("/proposaldoc", proposaldocroutes);
server.use("/uploads",express.static('uploads'))
server.use("/payment", paymentRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT} `)
})