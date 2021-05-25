const router = require("express").Router();
let User = require("../models/user");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//Add a new User
router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const number = req.body.number;
    const number_Of_reviews = Number(req.body.number_Of_reviews);
    const type = req.body.type;
    const password = req.body.password;

    const User = new User({
        first_name,
        last_name,
        email,
        number,
        number_Of_reviews,
        type,
        password
    })

    User.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: User.email,
            subject: 'YOU SIGN UP AS' + User.type + 'IN SLIIT-ICMS',
            text: 'Mr./Mrs. ' + User.first_name + ' ' + User.last_name + ",\n\n" 
                    + "Congradulations!\n\n" 
                    + 'Succesfully, You added as a' + user.type + 'in SLIIT_ICMS\n\n'
                    + "You Email is " + User.email + " \n\n"
                    + "You password is " + User.password + " \n\n"
                    + "make sure after you loging update your password and profile details.\n\n"       
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("User Added")
    }).catch((err)=>{
        console.log(err);
    })
}) 
//Get All The Users
router.route("/getallusers").get((req,res)=>{

    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err);
    })

})

//get user details using user id
router.route("/getuser/:id").get((req,res)=>{

    let userid = req.params.id;

    User.findById(reviwerid).then((user)=>{
        res.json(user)
    }).catch((err)=>{
        console.log(err);
    })

})

//update User details using User id
router.route("/update/:id").put(async(req,res)=>{

    let userid = req.params.id;
    const {first_name, last_name, email, number, password} = req.body;

    const updateUser = {
        first_name,
        last_name,
        email,
        number,
        password
    }

    const update = await User.findByIdAndUpdate(userid, updateUser)
    .then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: updateUser.email,
            subject: 'YOU SUCCESSFULLY UPDATED SLIIT-ICMS ACCOUNT',
            text: 'Mr./Mrs. ' + updateUser.first_name + ' ' + updateUser.last_name + ",\n\n"
                    + "Sir/madam,\n\n"
                    + "You successfully updated your account!\n\n"
                    + "If you didn't update your account make reupdate your account using below password.\n\n" 
                    + "You password is " + updateUser.email + " \n\n"   
                    + "You password is " + updateUser.password + " \n\n"
                       
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(200).send({status: "User Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Updationg data"})
    })

})
//delete the reviwer
router.route("/delete/:id/:email").delete(async(req,res)=>{
    let userid = req.params.id;
    let email = req.params.email;

    await User.findByIdAndDelete(userid)
    .then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: email,
            subject: 'YOU SUCCESSFULLY DELETED SLIIT-ICMS ACCOUNT',
            text: 'YOU SUCCESSFULLY DELETED YOUR ACCOUNT'    
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(200).send({status: "User Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with deleting data"})
    })
})
module.exports = router;