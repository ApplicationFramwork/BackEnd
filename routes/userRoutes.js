const router = require("express").Router();
let User = require("../models/user");
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        // cb(null,file.filename + '-' + Date.now() + path.extname(file.originalname))

        console.log(file.originalname);
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        const fileExt = path.extname(file.originalname);
        const fileText = Date.now() + "-" + file.originalname + "-" + dd + "-" + mm + "-" + yyyy + fileExt;
        cb(null, fileText);
    }
})

var upload = multer({
    storage : storage
})

//Add a new User
router.route("/add").post(upload.single('document'),(req,res)=>{

    
    const email = req.body.email;
    const type = req.body.type;
    const password = req.body.password;
    const document = req.file.filename;
    // adImageUrl = req.files.banner[0].path.replace(/\\/g, '/');

    const user = new User({
        email,
        type,
        password,
        document
    })

    user.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: user.email,
            subject: 'YOU SIGN UP AS ' + user.type + ' IN SLIIT-ICMS',
            text: 'Mr./Mrs.,\n\n' 
                    + "Congradulations!\n\n" 
                    + 'Succesfully, You added as a ' + user.type + ' in SLIIT_ICMS\n\n'
                    + "You Email is " + user.email + " \n\n"
                    + "You password is " + user.password + " \n\n"
                    + "Thank You.\n\n"       
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