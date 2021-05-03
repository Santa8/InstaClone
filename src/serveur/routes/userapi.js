const router = require('express').Router();
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const {registerValidation,loginValidation} = require('./validation');

// Validation schemas
const signupValidationSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  username: joi.string().min(3).max(20).required(),
  password: joi.string().required(),
  email: joi.string().required().email()
});

const loginValidationSchema = joi.object({
  username: joi.string().max(20).required(),
  password: joi.string().required()
});

//=================================================================
// signup a new user
router.post('/register',  async (req,res)=>{
  console.log('asdfdgdsf')
  // Validate data
 
  const {error} = registerValidation(req.body);
  if(error) {
    res.send(error.details[0].message);
  }

  // check if user already exist
  const emailExist = await User.findOne({email:req.body.email})
  if(emailExist){
      return  res.json({
           message:"email is already exist",
      });
  } 

  //Hash the password
  const salt = await  bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
 if( !error && !emailExist){
  // Add User
  const user = new User({
    id:mongoose.Types.ObjectId(),
      name : req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword
  });
  console.log(user.id)

   
  user.save()
    .then(doc=>{
        res.json({
             message:"User added",
             results:doc
        });
      })
      .catch(err=>{
           res.json(err);
      });
    }     

    });



//=================================================================
// login an user
router.post('/login', async (req,res) => {

  // Validate data
  const {error} = loginValidation(req.body);
  if(error) {
    return res.json({
      message:"email or password not correct",
     
  });

    }    

  // check email
  const user = await User.findOne({email:req.body.email});
  if (!user) {
    return  res.json({
      message:"email is not exist",
      
  });
    }
   
  // check password 
  const validPass = await bcrypt.compare(req.body.password,user.password);
   

   
    if (!validPass){
      return  res.json({
        message:"password is not correct",
        
    });
  
     } 

     if(user && validPass ) {

     console.log(user.name)
     console.log(user._id)
     console.log('hananann') 
    //const authToken = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '10h' });
    //res.header('auth-token', authToken).send(authToken);
    const authToken = jwt.sign({ id: user.id , name: user.name }, 'secret', { expiresIn: 3000 });
    console.log(authToken)
   // res.header('auth-token', authToken).send(authToken);
    console.log("auth.js, Login Success");
    return  res.json({
      message:"User Found",
    
      token: authToken,
      id:user._id
      
  });



     }
  
});

router.post("/getUserDetails",function(req,res){
  console.log('dkhaaaal');
  var id=req.body.userid;
  var getUserDetails= User.find({_id:id},{'name':1,'username':1,'bio':1,'website':1});
  getUserDetails.exec()
  .then(data=>{
      res.status(200).json({
          message:"OK",
          results:data
      });
  })
  .catch(err=>{
      res.json(err);
  })
  
  
  });


module.exports = router;
