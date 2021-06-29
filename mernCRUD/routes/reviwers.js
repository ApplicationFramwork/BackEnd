const router = require("express").Router();
let Reviwer = require("../models/reviwers");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//Add a new Reviwer
router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const number_Of_reviews = Number(req.body.number_Of_reviews);
    const password = req.body.password;

    const newReviwer = new Reviwer({
        first_name,
        last_name,
        email,
        number_Of_reviews,
        password
    })

    newReviwer.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newReviwer.email,
            subject: 'YOU ADDED AS A REVIWER IN SLIIT-ICMS',
            text: 'Mr./Mrs. ' + newReviwer.first_name + ' ' + newReviwer.last_name + ",\n\n" 
                    + "Congradulations!\n\n" 
                    + "Succesfully, You added as a reviwer in SLIIT_ICMS\n\n"
                    + "You email is " + newReviwer.email + " \n\n"
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

//Get All The Reviwer
router.route("/getallreviwers").get((req,res)=>{

    Reviwer.find().then((reviwers)=>{
        res.json(reviwers)
    }).catch((err)=>{
        console.log(err);
    })

})

//get reviwer details using reviwer id
router.route("/getreviwer/:id").get((req,res)=>{

    let reviwerid = req.params.id;

    Reviwer.findById(reviwerid).then((reviwer)=>{
        res.json(reviwer)
    }).catch((err)=>{
        console.log(err);
    })

})

//update reviwer details using reviwer id
router.route("/update/:id").put(async(req,res)=>{

    let reviwerid = req.params.id;
    const {first_name, last_name, email, number_Of_reviews, password} = req.body;

    const updateReviwer = {
        first_name,
        last_name,
        email,
        number_Of_reviews,
        password
    }

    const update = await Reviwer.findByIdAndUpdate(reviwerid, updateReviwer)
    .then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: updateReviwer.email,
            subject: 'YOU SUCCESSFULLY UPDATED SLIIT-ICMS REVIWER ACCOUNT',
            text: 'Mr./Mrs. ' + updateReviwer.first_name + ' ' + updateReviwer.last_name + ",\n\n"
                    + "Sir/madam,\n\n"
                    + "You successfully updated your account!\n\n"
                    + "If you didn't update your account make reupdate your account using below password.\n\n"    
                    + "You password is " + updateReviwer.password + " \n\n"
                       
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(200).send({status: "Reviwer Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Updationg data"})
    })

})
//update reviwe number and reviwer type
router.route("/updatereviweNo/:id").put(async(req,res)=>{

    let reviwerid = req.params.id;
    const {number_Of_reviews} = req.body;

    const updateReviwer = {
        number_Of_reviews
    }
    const update = await Reviwer.findByIdAndUpdate(reviwerid, updateReviwer)
    .then(()=>{
        console.log(type)
        res.status(200).send({status: "Reviwer Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Updationg data"})
    })
})
//delete the reviwer
router.route("/delete/:id/:email").delete(async(req,res)=>{
    let reviwerid = req.params.id;
    let email = req.params.email;

    await Reviwer.findByIdAndDelete(reviwerid)
    .then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: email,
            subject: 'YOU SUCCESSFULLY DELETED SLIIT-ICMS REVIWER ACCOUNT',
            text: 'YOU SUCCESSFULLY DELETED YOUR REVIWER ACCOUNT'    
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(200).send({status: "Reviwer Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data"})
    })
})


module.exports = router;