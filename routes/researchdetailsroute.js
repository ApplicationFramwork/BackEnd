const router = require("express").Router();
let Researchdoc = require("../models/researchdetails");
const path = require('path');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {

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
    storage: storage
})

router.route("/addreseardoc").post(upload.single('document'), (req, res) => {

    const research_topic = req.body.research_topic;
    const submiteremail = req.body.submiteremail;
    const reseach_description = req.body.reseach_description;
    const document = req.file.filename;
    const status = 'Pending';
    const total_reviwe_point = 0;

    const researchdoc = new Researchdoc({
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
})
//get all events
router.route("/getallresearchdocs").get((req, res) => {
    Researchdoc.find().then((events => {
        res.json(events)
    })).catch((err) => {
        console.log(err)
    })
})
//get research details using research id
router.route("/getresearch/:id").get((req, res) => {

    let researchrid = req.params.id;
    Researchdoc.findById(researchrid).then((reviwer) => {
        res.json(reviwer)
    }).catch((err) => {
        console.log(err);
    })

})




module.exports = router;
