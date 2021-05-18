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


router.post("/unfollow", async (req, res) => {
  const id = req.body.Id;
  const followId = req.body.followId;

  if (id ){
  console.log("unfollow")
  
  User.updateOne(
    { _id: id },
    { $pull: { following : { Id: followId } } },
    { safe: true, multi: true },
    function (err, obj) {
      
    }
  );
  User.updateOne(
    { _id: followId },
    { $pull: { followers : { Id: id } } },
    { safe: true, multi: true },
    function (err, obj) {
      res.send({
        value: true,
        message: "Follower deleted",
      });
    }
  );
  }


  
});

router.post("/getIsFollowing", async (req, res) => {
  const id = req.body.userId;
  const followId = req.body.followId;
  let value = false;
  console.log(followId)

  isFollowing = await User.find({ _id : id  , "following.Id" : followId } , "username" ) ;

  if(!isFollowing.length){
       value = false;
  }
  else {
    value =true;
  }
  res.send({value:value});
  console.log(value)


})

router.post("/follow", async (req, res) => {
  const id = req.body.Id;
  const followId = req.body.followId;
  //console.log(id)
  if (id){

  const nameFollow = await User.findById(followId, "username");
  const FollowDetails = await User.findById(followId, {"username":1,"name":1,"url":1});
  const nameUser = await User.findById(id, "username");
  //console.log(nameFollow);
   const alreadyFollowing =  await User.find( { _id : id , "following.Id" : followId } , "username" );
   
   console.log(alreadyFollowing);
   const namUser = await User.findById(id, {"username":1,"name":1,"url":1});
 if (!alreadyFollowing.length) {

  User.findById(id, function (error, user) {
    user.following.push({ Id: followId, name: nameFollow,nameVrai:FollowDetails.name,usernameVrai:FollowDetails.username,url:FollowDetails.url });

    user.save()
      .then((doc) => {
       res.send({value : true , message :"succes"})
      })
      .catch((error) => {
        res.json(error);
      });
  });
  
  User.findById(followId, function (error, user) {
    user.followers.push({ Id: id, name: nameUser,nameVrai:namUser.name,usernameVrai:namUser.username,url:namUser.url });

    user.save();
  });

   }

   else {

    res.send({value : false, message : "already following"})
   }
  }
});

router.post("/updatefollowing", async (req, res) => {
  var following = req.body.following;
  var userid = req.body.userid;
  
   for(let i=0;i<following.length;i++) {
     
    
     var followingid=following[i].Id;
     
const FollowDetails = await User.findById(followingid, {"username":1,"name":1,"url":1});
  User.updateOne(
    { "_id":userid ,"following.Id": followingid },
    { $set: { "following.$.nameVrai": FollowDetails.name ,  "following.$.usernameVrai": FollowDetails.username , "following.$.url": FollowDetails.url  } },

    function (err, doc) {
      
    }
  );

   }
   const Following = await User.findById(userid, "following");
   res.status(200).json({
    value: true,
    results:Following,
  });

});

router.post("/updatefollowers", async (req, res) => {
  var followers = req.body.followers;
  var userid = req.body.userid;
  
   for(let i=0;i<followers.length;i++) {
     
    
     var followersid=followers[i].Id;
     
const FollowDetails = await User.findById(followersid, {"username":1,"name":1,"url":1});
  User.updateOne(
    { "_id":userid ,"followers.Id": followersid },
    { $set: { "followers.$.nameVrai": FollowDetails.name ,  "followers.$.usernameVrai": FollowDetails.username , "followers.$.url": FollowDetails.url  } },

    function (err, doc) {
      
    }
  );

   }
   const Followers = await User.findById(userid, "followers");
   res.status(200).json({
    value: true,
    results:Followers,
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
    }
  }
  return res.send({ totalPosts });
});

router.post("/listUsers", async (req, res) => {
  const list = await User.find({ _id : { $ne : req.body.Id  } }, "username");


  const lista = [];

  for (let i = 0; i < list.length; i++){
      let follow;
      isFollowing = await User.find({ _id : req.body.Id  , "following.name._id" : list[i]._id } , "username" ) ;
      if (!isFollowing.length){
           follow = 0;
      }
      else {

        follow = 1;
      }
       
      lista.push({ name: list[i].username, follow: follow , Id: list[i]._id });

  }

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
