const router = require("express").Router();
let Event = require("../models/Event");

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

    const newEvent = new Event({
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    })

    newEvent.save().then(() =>{
        res.json("Event Added")
    }).catch((err)=>{
      console.log(err);
    })

})
//get all events
router.route("/").get((req,res)=>{
    Event.find().then((events =>{
        res.json(events)
    })).catch((err)=>{
        console.log(err)
    })
})

//update events
router.route("/update/:id").put(async (req, res)=>{
    let eventId = req.params.id;
    const {title, eventType, description, startDate, duration, venue, organizedBy,eventStatus} = req.body;

    const updateEvent = {
        title,
        eventType,
        description,
        startDate,
        duration,
        venue,
        organizedBy,
        eventStatus
    }
    const update = await Event.findByIdAndUpdate(eventId, updateEvent).then(()=> {
        res.status(200).send({status: "Event updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});

    })

})
//delete an event
router.route("/delete/:id").delete(async (req, res)=>{
    let eventId = req.params.id;

    await Event.findByIdAndDelete(eventId).then(()=>{
        res.status(200).send({status: "Event deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete ", eventerror: err.message});
    })
})


//get event by ID
router.route("/get/:id").get(async (req, res)=>{
    let eventId = req.params.id;
        Event.findById(eventId).then((editor)=>{
            res.json(editor)
        }).catch((err)=>{
            console.log(err);
        })

})

//get all conference events
router.route("/").get((req,res)=>{
    Event.find().then((events =>{
        res.json(events)
    })).catch((err)=>{
        console.log(err)
    })
})
//get all confirmed events
router.route("/getConfirmed").get((req,res)=>{
    let status = "Confirmed";
    Event.find({eventStatus : status}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err);
    })
})
//get event by status
router.route("/getEvents/:status").get((req,res)=>{
    let status = req.params.status;
    Event.find({eventStatus : status}).then((events)=>{
        res.json(events)
    }).catch((err)=>{
        console.log(err);
    })
})




module.exports = router;
