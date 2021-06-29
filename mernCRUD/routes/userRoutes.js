const router = require("express").Router();
let User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'dseiow985344he02-238hfsdy22@@@sdtjerltmdjdguot';
let proposalDocument = require('../models/proposaldetails')
let researchlDocument = require('../models/researchdetails')
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
//add new researcher
router.route("/addresearcher").post(upload.single('document'), (req, res) => {
    const email = req.body.email;
    const type = req.body.type;
    const password = req.body.password;

    const research_topic = 'New Researcher';
    const submiteremail = req.body.email;
    const reseach_description = 'New Research Papers';
    const document = req.file.filename;
    const status = 'Pending';
    const total_reviwe_point = 0;

    const researchdoc = new researchlDocument({
        research_topic,
        submiteremail,
        reseach_description,
        document,
        status,
        total_reviwe_point
    })
    researchdoc.save().then(() => {
        res.json("New research paper Added")
    }).catch((err) => {
        console.log(err);
    })

    const user = new User({
        email,
        type,
        password
    })
    user.save().then(() => {
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
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
    }).catch((err) => {
        console.log(err);
    })
})
//Add a new Workshop_Presenter
router.route("/addWorkshoppresenter").post(upload.single('document'),(req,res)=>{
    const email = req.body.email;
    const type = req.body.type;
    const password = req.body.password;

    const proposal_topic = 'New Workshop Presenter';
    const submiteremail = req.body.email;
    const proposal_description = 'New Work shop proposal';
    const document = req.file.filename;
    const status = 'Pending';
    const total_reviwe_point = 0;

    const proposaldoc = new proposalDocument({
        proposal_topic,
        submiteremail,
        proposal_description,
        document,
        status,
        total_reviwe_point
    })
    proposaldoc.save().then(() => {
        res.json("New workshop proposal Added")
    }).catch((err) => {
        console.log(err);
    })

    const user = new User({
        email,
        type,
        password
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
    }).catch((err)=>{
        console.log(err);
    })
})
//Add a new attende
router.route("/addattende").post(upload.single('document'), (req, res) => {
    const email = req.body.email;
    const type = req.body.type;
    const password = req.body.password;

    const user = new User({
        email,
        type,
        password
    })
    user.save().then(() => {
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
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("User Added")
    }).catch((err) => {
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
//get all users
router.route("/").get((req,res)=>{
    User.find().then((user =>{
        res.json(user)
    })).catch((err)=>{
        console.log(err)
    })
})

//update user details
router.route("/update/:id").put(async (req, res)=>{
    let userId = req.params.id;
    const {name, email, user_name,type,mobile_number} = req.body;

    const updateUser = {
        name,
        email,
        user_name,
        type,
        mobile_number
    }
    const update = await User.findByIdAndUpdate(userId, updateUser).then(()=> {
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })

})


//delete an user
router.route("/delete/:id").delete(async (req, res)=>{
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});

    })
})


//get user by Id
router.route("/get/:id").get(async (req, res)=>{
    let userId = req.params.id;
    const user = await User.findById(userId).then((user)=>{
        res.status(200).send({status: "User fetched", user});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get data'", error: err.message});
    })
})

router.route("/login").post(async (req,res )=>{
    const {email , password} = req.body;
    const user = await User.findOne({email,password}).lean();

    if(!user){
        return res.json({status : 'error', error: 'Invalid username/password'});
    }
    const token = jwt.sign({
            id : user._id,
            name : user.first_name,
            user_role : user.type,
            email : user.email,
            password : user.password,
            mobile : user.number
        },JWT_SECRET

    )
    return res.json({status : 'ok' , token : token})
})
//create a user
router.route("/addStaff").post(async (req,res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const type = req.body.type;
    const number = req.body.number;
    const email = req.body.email;

    let newStaff = User({
        first_name,
        last_name,
        password,
        type,
        number,
        email
    })

    newStaff.save().then(() => {
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newStaff.email,
            subject: 'YOU SIGN UP AS ' + newStaff.type + ' IN SLIIT-ICMS',
            text: 'Mr./Mrs.,\n\n'
                + "Congratulations!\n\n"
                + 'Successfully, You added as a ' + newStaff.type + ' in SLIIT ICMS\n\n'
                + "You Email is " + newStaff.email + " \n\n"
                + "You password is " + newStaff.password + " \n\n"
                + "Thank You.\n\n"
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("User Added")
    }).catch((err) => {
        console.log(err);
    })


})
router.route("/getUsersByType/:type").get((req,res)=>{
    let type = req.params.type;
    User.find({type : type}).then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;