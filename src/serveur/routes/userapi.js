const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const { registerValidation, loginValidation } = require("./validation");
const { verifyToken } = require("../middleware/verifyToken");
//=================================================================
// signup a new user

router.post("/follow", async (req, res) => {
  const id = req.body.Id;
  const followId = req.body.followId;

  const nameFollow = await User.findById(followId, "username");

  //console.log(nameFollow);
  const nameUser = await User.findById(id, "username");

  User.findById(id, function (error, user) {
    user.following.push({ Id: followId, name: nameFollow });

    user
      .save()
      .then((doc) => {
        res.status(201).json({
          message: "add Following",
          results: doc,
        });
      })
      .catch((error) => {
        res.json(error);
      });
  });

  User.findById(followId, function (error, user) {
    user.followers.push({ Id: id, name: nameUser });

    user.save();
    /*.then(doc =>{
          res.status(201).json({

              message:"add Follower",
              results:doc


          }); 

     })
     .catch(error=>{
       res.json(error);

     })*/
  });
});

router.post("/listPosts", async (req, res) => {
  const id = req.body.Id;
  console.log(id);
  const following = await User.findById(id, "following");

  const totalPosts = [];
  if (following) {
    for (let index = 0; index < following.following.length; index++) {
      var posts = await User.findById(following.following[index].Id, "posts");

      console.log("yooow");
      if (posts) {
        if (posts.posts.length != 0) {
          posts.posts.forEach((post) => {
            totalPosts.push({
              username: following.following[index].name.username,
              posts: post.urlpost,
            });
          });
        }
      }

      //totalPosts.push({"username" : following.following[index].name , "posts" : posts })
    }
  }

  console.log(totalPosts);

  return res.send({ totalPosts });
});

router.post("/listUsers", async (req, res) => {
  const list = await User.find({}, "username");

  const lista = [];

  list.forEach((user) => {
    lista.push({ name: user.username, follow: 1, Id: user._id });
  });

  console.log(lista);

  return res.send({ lista });
});

router.post("/register", async (req, res) => {
  // Validate data

  const { error } = registerValidation(req.body);
  if (error) {
    return res.send({ value: false, message: error.details[0].message });
  }

  // check if user already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.send({ value: false, message: "Email already exist" });
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  if (!error && !emailExist) {
    // Add User
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(user.id);

    user
      .save()
      .then((doc) => {
        return res.send({ value: true, message: "User registred" });
      })
      .catch((err) => {
        console.log(err);
        return res.send({ value: false, message: "Error saving user" });
      });
  }
});

//=================================================================
// login an user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) {
      return res.send({ value: false, message: error.details[0].message });
    }

    // check email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //return throw new Error('Something broke! 😱')
      return res.send({ value: false, message: "Email not found" });
    }

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      return res.send({ value: false, message: "Password is not correct" });
      //return next(new Error('password is not correct'))
    }

    if (user && validPass) {
      const authToken = jwt.sign({ id: user._id }, process.env.Secret_Token, {
        expiresIn: 3600,
      });
      //res.header('auth-token', authToken).send(authToken);
      if (!authToken) throw Error("Couldnt sign the token");
      console.log("Login Success");
      return res.send({
        value: true,
        message: "User Found",
        token: authToken,
        id: user._id,
      });
    }
  })
);

router.post("/getUserDetails", function (req, res) {
  console.log("dkhaaaal");
  var id = req.body.userid;
  var getUserDetails = User.find(
    { _id: id },
    {
      name: 1,
      username: 1,
      bio: 1,
      website: 1,
      url: 1,
      posts: 1,
      followers: 1,
      following: 1,
    }
  );
  getUserDetails
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "OK",
        results: data,
      });

      //console.log(data)
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/EditProfile", function (req, res) {
  var id = req.body.userid;
  var name = req.body.name;
  var username = req.body.username;
  var bio = req.body.bio;
  var website = req.body.website;

  User.findById(id, function (error, user) {
    user.name = name;
    user.username = username;
    user.bio = bio;
    user.website = website;

    user
      .save()
      .then((doc) => {
        res.status(201).json({
          message: "Profile updated succefully",
          results: doc,
        });
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

//upload profile photo

router.post("/uploadprofilephoto", function (req, res) {
  var id = req.body.id;
  var url = req.body.url;

  User.findById(id, function (error, user) {
    user.url = url;

    user
      .save()
      .then((doc) => {
        res.status(201).json({
          message: "POST UPLOADED",
          results: doc,
        });
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

//upload post

router.post("/uploadpost", function (req, res) {
  var id = req.body.id;
  var urlpost = req.body.urlpost;
  var description = req.body.description;
  var date = req.body.date;

  User.findById(id, function (error, user) {
    user.posts.push({
      Id: uuidV4(),
      urlpost: urlpost,
      description: description,
      date: date,
    });

    user
      .save()
      .then((doc) => {
        res.send({
          value: true,
          message: "POST UPLOADED",
        });
      })
      .catch((error) => {
        res.json(error);
      });
  });
});

router.post("/UpdatePost", function (req, res) {
  var userid = req.body.userid;
  var postid = req.body.postid;
  var description = req.body.description;

  User.updateOne(
    { "posts.Id": postid },
    { $set: { "posts.$.description": description } },

    function (err, doc) {
      res.send({
        value: true,
        message: "POST UPDATED",
      });
    }
  );
});

router.post("/DeletePost", function (req, res) {
  var userid = req.body.userid;
  var postid = req.body.postid;

  User.updateOne(
    { _id: userid },
    { $pull: { posts: { Id: postid } } },
    { safe: true, multi: true },
    function (err, obj) {
      //do something smart
      res.send({
        value: true,
        message: "POST DELETED",
      });
    }
  );

  /*User.updateOne({ },{'$pull':{ 'posts':{'Id': postid }}},{multi:true}, function(err,doc) { 
      res.send({

        value:true,
        message:'POST DELETED'
        
    })
  })*/
  /*User.deleteOne({'posts.Id':postid }, 
      {'$pullAll': { 'posts.Id':postid  }}
      
      , function(err,doc) { 
        res.send({

          value:true,
          message:'POST DELETED'
          
      }); 
    }) */
});

module.exports = router;
