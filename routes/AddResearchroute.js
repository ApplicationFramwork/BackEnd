const router = require("express").Router();
let Reseatchreviws = require("../models/AddResearches");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

router.route("/add").post((req,res)=>{

    const research_name = req.body.research_name;
    const research_doc = req.body.research_doc;
    

    const newReviwer = new Reseatchreviws({
        research_name,
        research_doc
    })

    newReviwer.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newReviwer.email,
            subject: 'YOU ADDED AS A REVIWER IN SLIIT-ICMS',
            text: 'Mr./Mrs. ' + newReviwer.first_name + ' ' + newReviwer.last_name + ",\n\n" 
                    + "Congradulations!\n\n" 
                    + "Succesfully, You added as a reviwer in SLIIT_ICMS\n\n"
                    + "You password is " + newReviwer.password + " \n\n"
                    + "make sure after you loging update your password and profile details.\n\n"       
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("Reviwer Added")
    }).catch((err)=>{
        console.log(err);
    })
}) 
module.exports = router;