const router = require("express").Router();
let Workshop = require("../models/Workshop");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});
//add a new event
router.route("/add").post((req,res)=>{
    const title = req.body.title;
    const eventType = req.body.eventType;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const duration = req.body.duration;
    const venue = req.body.venue;
    const organizedBy = req.body.organizedBy;
    const eventStatus = req.body.eventStatus;

    const newWorkshop = new Workshop({
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    })

    newWorkshop.save().then(() =>{
        res.json("Event Added")
    }).catch((err)=>{
        console.log(err);
    })

})
//get all workshops
router.route("/").get((req,res)=>{
    Workshop.find().then((workshops =>{
        res.json(workshops)
    })).catch((err)=>{
        console.log(err)
    })
})

//update events
router.route("/update/:id").put(async (req, res)=>{
    let workshopId = req.params.id;
    const {title, eventType, description, startDate, duration, venue, organizedBy,eventStatus} = req.body;

    const updateWorkshop = {
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    }
    const update = await Workshop.findByIdAndUpdate(workshopId, updateWorkshop).then(()=> {
        res.status(200).send({status: "Event updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })

})
//delete an event
router.route("/delete/:id").delete(async (req, res)=>{
    let workshopId = req.params.id;

    await Workshop.findByIdAndDelete(workshopId).then(()=>{
        res.status(200).send({status: "Event deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete ", workshoperror: err.message});
    })
})

//get event by ID
router.route("/existingWorkshop/:id").get(async (req, res)=>{
    let workshopId = req.params.id;
    Workshop.findById(workshopId).then((editor)=>{
        res.json(editor)
    }).catch((err)=>{
        console.log(err);
    })
})

//get all conference events
router.route("/").get((req,res)=>{
    Workshop.find().then((workshops =>{
        res.json(workshops)
    })).catch((err)=>{
        console.log(err)
    })
})

//get confirmed events
router.route("/getConfirmed").get((req,res)=>{
    let status = "Confirmed";
    Workshop.find({eventStatus : status}).then((workshops)=>{
        res.json(workshops)
    }).catch((err)=>{
        console.log(err);
    })
})
//get event by status
router.route("/getEvents/:status").get((req,res)=>{
    let status = req.params.status;
    Workshop.find({eventStatus : status}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err);
    })
})
//admin approve or reject orders and send mail to workshop conductor
router.route("/adminAdd").post((req,res)=>{
    const title = req.body.title;
    const eventType = req.body.eventType;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const duration = req.body.duration;
    const venue = req.body.venue;
    const organizedBy = req.body.organizedBy;
    const eventStatus = req.body.eventStatus;

    const newWorkshop = new Workshop({
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    })
    newWorkshop.save().then(() =>{
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: newWorkshop.organizedBy,
            subject: 'Your Workshop has '+ newWorkshop.eventStatus,
            text: 'Mr./Mrs.,\n\n'
                + 'Your'+ newWorkshop.title +' has been ' + newWorkshop.eventStatus + '\n\n'
                + "Thank You.\n\n"
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                res.json("Event Added")
            }
        });

    }).catch((err)=>{
        console.log(err);
    })


})
//admin update workshop
router.route("/adminUpdate/:id").put(async (req, res)=>{
    let workshopId = req.params.id;
    const {title, eventType, description, startDate, duration, venue, organizedBy,eventStatus} = req.body;
    const updateWorkshop = {
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    }
    const update = await Workshop.findByIdAndUpdate(workshopId, updateWorkshop).then(()=> {
        let mailDetails = {
            from: 'applicationframeworkproject@gmail.com',
            to: updateWorkshop.organizedBy,
            subject: 'Your' + updateWorkshop.title + ' has ' + updateWorkshop.eventStatus,
            text: 'Mr./Mrs.,\n\n'
                + 'Your workshop has been ' + updateWorkshop.eventStatus + '\n\n'
                + "Thank You.\n\n"
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                res.json("Event Updated")
            }
        });
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;
