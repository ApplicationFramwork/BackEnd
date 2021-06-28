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
router.route("/add").post((req, res) => {

    const reviwer_id = req.body.reviwer_id;
    const proposal_id = req.body.Proposal_id;
    const submiteremail = req.body.email;
    const reviwe_comment = req.body.reviwe_comment;
    const status = req.body.status;
    const reviwe_point = req.body.reviwe_point;
    const researchTopic = req.body.researchTopic;

    const newProposalreviws = new Proposalreviws({
        reviwer_id,
        proposal_id,
        reviwe_comment,
        status,
        reviwe_point
    })

    newProposalreviws.save().then(() => {
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: submiteremail,
            subject: 'Your Proposal Review Status',
            text: 'sir/madam,\n\n\n'
                + "Your Research Topic: " + researchTopic + " \n\n"
                + "Review Status: " + newProposalreviws.status + " \n\n"
                + "Reviewer's comment: " + newProposalreviws.reviwe_comment + " \n\n"

                + "If your Proposal papers are approved.Please pay necessary payment!\n\n"

                + "Thank you for submitting your proposal to THE SLIIT_ICAF!\n\n"
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("Proposal Reviwe Added")
    }).catch((err) => {
        console.log(err);
    })
})

//Get All The Reviwer
router.route("/getproposalreviws").get((req, res) => {

    Proposalreviws.find().populate('User', '_id  last_name email  password')
        .then((proposalReviws) => {
            res.json(proposalReviws)
        }).catch((err) => {
            console.log(err);
        })

})
//get  Research review details using research id
router.route("/getresearchreviwetoupdate/:id").get((req, res) => {

    let researchid = req.params.id;

    Proposalreviws.find({ proposal_id: researchid }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
//get approve Proposal review details using reviwer id
router.route("/getresearchreviwereviwer/:id").get((req, res) => {

    let researchid = req.params.id;

    Proposalreviws.find({ reviwer_id: researchid, status: "Approved" }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
//get declline proposal review details using reviwer id
router.route("/getdeclineresearchreviwereviwer/:id").get((req, res) => {

    let researchid = req.params.id;

    Proposalreviws.find({ reviwer_id: researchid, status: "Decline" }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
// get research review details using status
router.route("/getproposal/:status").get((req, res) => {
    let status = req.params.status;

    Proposalreviws.find({ status: status }).populate('User', '_id  last_name email  password')
        .then((proposalReviws) => {
            res.json(proposalReviws)
        }).catch((err) => {
            console.log(err);
        })
})

//get Proposal review details using proposal id
router.route("/getproposalreviws/:id").get((req, res) => {

    let proposalid = req.params.id;

    Proposalreviws.findById(proposalid).populate('User', '_id  last_name email  password')
        .then((proposalReviws) => {
            res.json(proposalReviws)
        }).catch((err) => {
            console.log(err);
        })

})

//update Proposal reviews details using Proposal id
router.route("/updateProposalReview/:id").put(async (req, res) => {

    let proposalid = req.params.id;
    const { reviwer_id, proposal_id, reviwe_comment, status, reviwe_point, email, researchTopic } = req.body;

    const updateProposalReviwe = {
        reviwer_id,
        proposal_id,
        reviwe_comment,
        status,
        reviwe_point
    }

    const update = await Proposalreviws.findByIdAndUpdate(proposalid, updateProposalReviwe)
        .then(() => {
            let mailDetails = {
                from: 'applicationframeworkproject@gmail.com',
                to: email,
                subject: 'Your Proposal Review Status updated',
                text: 'sir/madam,\n\n\n'
                    + "Your Research Topic: " + researchTopic + " \n\n"
                    + "Review Status: " + updateProposalReviwe.status + " \n\n"
                    + "Reviewer's point: " + updateProposalReviwe.reviwe_point + " \n\n"

                    + "Thank you for submitting your proposal to THE SLIIT_ICAF!\n\n"
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });

            res.status(200).send({ status: "proposal reviwe Updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updationg data" })
        })

})
//delete the reviwes
router.route("/delete/:id").delete(async (req, res) => {
    let reviwerid = req.params.id;

    await Proposalreviws.findByIdAndDelete(reviwerid)
        .then(() => {

            res.status(200).send({ status: "Reviwes Deleted" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting data" })
        })
})
module.exports = router;