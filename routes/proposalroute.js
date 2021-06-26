const router = require("express").Router();
let Proposalreviws = require("../models/proposalReviews");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//Add a new proposal reviwe
router.route("/add").post((req,res)=>{

    const reviwer_id = req.body.reviwer_id;
    const reviwer_name = req.body.reviwer_name;
    const proposal_id = req.body.proposal_id;
    const proposal_topic = req.body.proposal_topic;
    const submiteremail = req.body.submiteremail;
    const reviwe_date = new Date().toLocaleDateString();
    const reviwe_comment = req.body.reviwe_comment;
    const status = req.body.status;
    const reviwe_point = req.body.reviwe_point;

    const newProposalreviws = new Proposalreviws({
        reviwer_id,
        reviwer_name,
        proposal_id,
        proposal_topic,
        submiteremail,
        reviwe_date,
        reviwe_comment,
        status,
        reviwe_point
    })

    newProposalreviws.save().then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newProposalreviws.submiteremail,
            subject: 'Your Proposal Review Status',
            text: 'sir/madam,\n\n\n' 
                    + "Your Proposal ID: " + newProposalreviws.proposal_id + " \n\n"
                    + "Your Proposal Topic: " + newProposalreviws.proposal_topic + " \n\n"
                    + "Review Status: " + newProposalreviws.status + " \n\n"
                    + "Reviewer's comment: " + newProposalreviws.reviwe_comment + " \n\n"
                    + "Reviewed by: " + newProposalreviws.reviwer_name + " \n\n\n"
                     
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

//Get All The Reviwer
router.route("/getproposalreviws").get((req,res)=>{

    Proposalreviws.find().populate('Reviwer', '_id first_name last_name email number_Of_reviews password')
        .then((proposalReviws) => {
        res.json(proposalReviws)
    }).catch((err)=>{
        console.log(err);
    })

})
// get research review details using status
router.route("/getproposal/:status").get((req,res)=>{
    let status = req.params.status;

    Reseatchreviws.find({ status: status }).populate('Reviwer', '_id first_name last_name email number_Of_reviews password')
        .then((proposalReviws) => {
        res.json(proposalReviws)
    }).catch((err)=>{
        console.log(err);
    })
})

//get Proposal review details using proposal id
router.route("/getproposalreviws/:id").get((req,res)=>{

    let proposalid = req.params.id;

    Proposalreviws.findById(proposalid).populate('Reviwer', '_id first_name last_name email number_Of_reviews password')
        .then((proposalReviws) => {
        res.json(proposalReviws)
    }).catch((err)=>{
        console.log(err);
    })

})

//update Proposal reviews details using Proposal id
router.route("/updateProposalReview/:id").put(async(req,res)=>{

    let proposalid = req.params.id;
    const {reviwer_id, reviwer_name, proposal_id, proposal_topic, submiteremail, reviwe_date, reviwe_comment, status, reviwe_point} = req.body;

    const updateProposalReviwe = {
        reviwer_id,
        reviwer_name,
        proposal_id,
        proposal_topic,
        submiteremail,
        reviwe_date,
        reviwe_comment,
        status,
        reviwe_point
    }

    const update = await Proposalreviws.findByIdAndUpdate(proposalid, updateProposalReviwe)
    .then(()=>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: updateProposalReviwe.submiteremail,
            subject: 'Your Proposal Review Status Updated',
            text: 'sir/madam,\n\n\n' 
                    + "Your Research ID: " + updateProposalReviwe.research_id + " \n\n"
                    + "Your Research Topic: " + updateProposalReviwe.research_topic + " \n\n"
                    + "Review Status: " + updateProposalReviwe.status + " \n\n"
                    + "Reviewer's comment: " + updateProposalReviwe.reviwe_comment + " \n\n"
                    + "Reviewed by: " + updateProposalReviwe.reviwer_name + " \n\n\n"
                     
                    + "Thank you for submitting your proposal to THE SLIIT_ICMS!\n\n"                  
                       
        };
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(200).send({status: "proposal reviwe Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with Updationg data"})
    })

})
module.exports = router;