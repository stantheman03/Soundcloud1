const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load validation
const validateProfileInput = require("../../validation/profile")
// Load Profile model
const Profile = require("../../models/Profile");
// Load user profile
const User = require("../../models/User");

// @route get api/profile/test
// @description tests profile route
// @acess public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route get api/profile/
// @dscription get current users profile
// @acess private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
    .populate("user",["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for current user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route GET api/profile/handle/:handle
// @dscription Get profile by handle
// @acess public
// router.get("/handle/:handle",(req,res)=>{
//     const errors = {};
// Profile.findOne({handle: req.params.handle})
// .populate("user",["name"])
// .then(profile=>{
//     if(!profile){
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(errors);
//     }
//     res.json(profile);
// })
// .catch(err=>res.status(404).json(err))
// })

// @route POST api/profile
// @dscription create or edit user profile
// @acess private
router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);
    // check validation
    console.log(req.body)
        if(!isValid){
        // return any errors
        return res.status(400).json(errors)
    }

    //   Get fields
    // create an empty object that gets the profile data
    const profileFields = {};
    // login user which will include name email
    profileFields.user = req.user.id;
    // check if handle is sent from the form if so profilefields.handle
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    // Social data, needs to get intialized, if not error is pofileFields.social does not exists
    profileFields.social = {};
    console.log(req.body.twitter);
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.soundcloud) profileFields.social.soundcloud = req.body.soundcloud;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    console.log(profileFields.social)
    console.log(profileFields)
    // Look for a user
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(profile){
            // Update
            Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
            )
            // it will respond with new data for the profile
            .then(profile=>res.json(profile))
        }else{
            // Create

            // Check if handle exsits
            Profile.findOne({handle:profileFields.handle}).then(profile=>{
                if(profile){
                    errors.handle = "The handle already exists";
                    res.status(400).json(errors)
                }
                // Save profile
                new Profile(profileFields).save().then(profile=> res.json(profile))
            })
        }
    })

  }
);

module.exports = router;
