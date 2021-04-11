const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('./validation');
const User = require('../User');
const { exist } = require('@hapi/joi');


router.post('/register',  async (req,res)=>{
    // Validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user already exist
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already exist !')

    //Hash the password
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // Add User
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    try{
        const savedUser =  await user.save();
        //res.send({userId : user._id });
    }
    catch(err){
        res.status(400).send(err);
    }

});


// LOGIN

router.post('/login', async (req,res) => {

    // Validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check email
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email not found !');

    // check password 
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password !');

    // Create and assign Token 
    const token = jwt.sign({_id: user._id},process.env.Secret_Token);
    //res.header('auth-token',token).send(token);
    //home_register()    //res.send('Logged in !');
});



module.exports = router;