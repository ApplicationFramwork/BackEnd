const router = require("express").Router();
const Payment = require("../models/Payment");
const OTP = require("../models/OTP");
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'applicationframeworkproject@gmail.com',
        pass: 'malisha1996'
    }
});

//Add Payment
router.route("/add").post(((req, res) => {
    const email = req.body.email;
    const amount = req.body.amount;
    const date = Date.now();
    const status = "Pending"
    const otp = Math.floor(1000 + Math.random() * 1000);

    const newPayment =  new Payment({
        email,
        amount,
        date,
        status
    });
    const newOTP = new OTP({
        email,
        otp
    })

    newPayment.save().then(()=>{
        newOTP.save().then(()=>{
            let mailDetails = {
                from: 'applicationframeworkproject@gmail.com',
                to: newPayment.email,
                subject: 'Your One-Time Password Request',
                text: 'Dear User\n'
                    + 'Your One-Time Password Request'
                    + 'Thank you for helping us make your ICAF payment more secure. Your request has been processed successfully.'
                    + "Your One Time Password is " + newOTP.otp + " \n\n"
                    + "For more information"
                    + "Please contact our 24 hour Call Centre through +94 (0) 11 0000000. \n\n"
                    + "Thank You for using ICAF payment gateway.\n\n"
                    + "This email is automatically generated by the ICAF payment gateway Centre. Please do not reply to this email."
            };
            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                    res.status(200).send({status: "Payment Added"})
                }
            });

        })
    })
}))

router.route("/allPayments").get((req,res)=>{
    Payment.find().then((Payments)=>{
        res.json(Payments)
    }).catch((err)=>{
        console.log(err);
    })

})

//Authentication with OTP
router.route("/auth").post(async (req,res) =>{
    const {email , otp } = req.body;
    const result = await OTP.find({email,otp}.lean);

    if(!result){
        return res.json({status : 'error', error: 'Invalid username/password'});
    }

    let status_II = "Pending";
    const payment = await Payment.findOne({status_II,email}.lean);
    await OTP.findByIdAndDelete(result._id);

    let status = "Confirmed"
    const updatePayment = {
        status
    }

    const update = await Payment.findByIdAndUpdate(payment._id, updatePayment).then(()=>{
        res.status(200).send({status: "Payment updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

module.exports = router;