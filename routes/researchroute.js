const router = require("express").Router();
let Reseatchreviws = require("../models/researchReviews");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//Add a new research reviwe
router.route("/add").post((req,res)=>{

    const reviwer_id = req.body.reviwer_id;
    const reviwer_name = req.body.reviwer_name;
    const research_id = req.body.research_id;
    const research_topic = req.body.research_topic;
    const submiteremail = req.body.submiteremail;
    const reviwe_date = new Date().toLocaleDateString();
    const reviwe_comment = req.body.reviwe_comment;
    const status = req.body.status;
    const reviwe_point = req.body.reviwe_point;

    const newResearchreviws = new Reseatchreviws({
        reviwer_id,
        reviwer_name,
        research_id,
        research_topic,
        submiteremail,
        reviwe_date,
        reviwe_comment,
        status,
        reviwe_point
    })

    newResearchreviws.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newResearchreviws.submiteremail,
            subject: 'Your Research Review Status',
            text: 'sir/madam,\n\n\n' 
                    + "Your Research ID: " + newResearchreviws.proposal_id + " \n\n"
                    + "Your Research Topic: " + newResearchreviws.proposal_topic + " \n\n"
                    + "Review Status: " + newResearchreviws.status + " \n\n"
                    + "Reviewer's comment: " + newResearchreviws.reviwe_comment + " \n\n"
                    + "Reviewed by: " + newResearchreviws.reviwer_name + " \n\n\n"
                     
                    + "Thank you for submitting your proposal to THE SLIIT_ICMS!\n\n"                  
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("Proposal Reviwe Added")
    }).catch((err)=>{
        console.log(err);
    })
}) 

//Get All The Research reviws.
router.route("/getresearchreviws").get((req,res)=>{

    Reseatchreviws.find().then((reseatchreviws)=>{
        res.json(reseatchreviws)
    }).catch((err)=>{
        console.log(err);
    })

})

//get Research review details using reviwer id
router.route("/getresearchreviws/:id").get((req,res)=>{

    let researchid = req.params.id;

    Reseatchreviws.findById(researchid).then((reseatchreviws)=>{
        res.json(reseatchreviws)
    }).catch((err)=>{
        console.log(err);
    })

})
module.exports = router;