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
router.route("/add").post((req, res) => {

    const reviwer_id = req.body.reviwer_id;
    const research_id = req.body.research_id;
    const submiteremail = req.body.email;
    const reviwe_comment = req.body.reviwe_comment;
    const status = req.body.status;
    const reviwe_point = req.body.reviwe_point;
    const researchTopic = req.body.researchTopic;

    const newResearchreviws = new Reseatchreviws({
        reviwer_id,
        research_id,
        reviwe_comment,
        status,
        reviwe_point
    })

    newResearchreviws.save().then(() => {
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: submiteremail,
            subject: 'Your Research Review Status',
            text: 'sir/madam,\n\n\n'
                + "Your Research Topic: " + researchTopic + " \n\n"
                + "Review Status: " + newResearchreviws.status + " \n\n"
                + "Reviewer's comment: " + newResearchreviws.reviwe_comment + " \n\n"

                + "If your research papers are approved.Please pay necessary payment!\n\n"

                + "Thank you for submitting your proposal to THE SLIIT_ICMS!\n\n"
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.json("research Reviwe Added")
    }).catch((err) => {
        console.log(err);
    })
})

//Get All The Research reviws.
router.route("/getresearchreviwe").get((req, res) => {

    Reseatchreviws.find().then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})


//get Research review details using reviwer id
router.route("/getresearchreviwe/:id").get((req, res) => {

    let researchid = req.params.id;

    Reseatchreviws.findById(researchid).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
//get  Research review details using research id
router.route("/getresearchreviwetoupdate/:id").get((req, res) => {

    let researchid = req.params.id;

    Reseatchreviws.find({ research_id: researchid }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
//get approve Research review details using reviwer id
router.route("/getresearchreviwereviwer/:id").get((req, res) => {

    let researchid = req.params.id;

    Reseatchreviws.find({ reviwer_id: researchid, status: "Approved" }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})
//get declline Research review details using reviwer id
router.route("/getdeclineresearchreviwereviwer/:id").get((req, res) => {

    let researchid = req.params.id;

    Reseatchreviws.find({ reviwer_id: researchid, status: "Decline" }).then((reseatchreviws) => {
        res.json(reseatchreviws)
    }).catch((err) => {
        console.log(err);
    })

})

// get research review details using status
router.route("/getresearch/:status").get((req, res) => {
    let status = req.params.status;

    Reseatchreviws.find({ status: status }).populate('User', '_id  last_name email  password')
        .then((researchreviws) => {
            res.json(researchreviws)
        }).catch((err) => {
            console.log(err);
        })
})

//update Research reviews details using resrarch id
router.route("/updateResearchReview/:id").put(async (req, res) => {

    let researchid = req.params.id;
    const { reviwer_id, research_id, reviwe_comment, status, reviwe_point, email, researchTopic } = req.body;

    const updateResearchReviwe = {
        reviwer_id,
        research_id,
        reviwe_comment,
        status,
        reviwe_point
    }

    const update = await Reseatchreviws.findByIdAndUpdate(researchid, updateResearchReviwe)
        .then(() => {
            let mailDetails = {
                from: 'applicationframeworkproject@gmail.com',
                to: email,
                subject: 'Your Research Review Status updated',
                text: 'sir/madam,\n\n\n'
                    + "Your Research Topic: " + researchTopic + " \n\n"
                    + "Review Status: " + updateResearchReviwe.status + " \n\n"
                    + "Reviewer's point: " + updateResearchReviwe.reviwe_point + " \n\n"

                    + "Thank you for submitting your proposal to THE SLIIT_ICAF!\n\n"
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            
            res.status(200).send({ status: "research reviwe Updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updationg data" })
        })

})
//delete the reviwes
router.route("/delete/:id").delete(async (req, res) => {
    let reviwerid = req.params.id;

    await Reseatchreviws.findByIdAndDelete(reviwerid)
        .then(() => {
           
            res.status(200).send({ status: "Reviwes Deleted" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting data" })
        })
})
module.exports = router;