const router = require("express").Router();
let Reseatchreviws = require("../models/AddResearches");
const nodemailer = require('nodemailer');

router.route("/add").post((req,res)=>{

    const research_name = req.body.research_name;
    const research_doc = req.body.research_doc;
    

    const newReviwer = new Reseatchreviws({
        research_name,
        research_doc
    })

    newReviwer.save().then(()=>{

        res.json("Research Added")
    }).catch((err)=>{
        console.log(err);
    })
}) 
module.exports = router;