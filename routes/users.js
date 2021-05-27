const router = require("express").Router();
let User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'dseiow985344he02-238hfsdy22@@@sdtjerltmdjdguot';

//Add users api
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const user_name = req.body.user_name;
    const password = req.body.password;
    const type = req.body.type;
    const mobile_number = req.body.mobile_number;

    const newUser = new User({
        name,
        email,
        user_name,
        password,
        type,
        mobile_number
    })

    newUser.save().then(() =>{
        res.json("User Added!!")
    }).catch((err)=>{
        console.log(err);
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
            name : user.name
        },JWT_SECRET

    )
    return res.json({status : 'ok' , data : token})
})
module.exports = router;