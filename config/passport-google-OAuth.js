const env = require('../config/enviroment') ; 

const passport = require("passport") ; 
// telling which googleOAuth statergy we are going to follow.
const googlOAuth = require("passport-google-oauth").OAuth2Strategy ;
// this module for generating random password if the user is not existant.  
const crypto = require("crypto")  ; 
// we will require the user document. 
const User = require("../models/userInfoSchema") ; 
const blockedUsers = require("../models/blockedSchema")  ; 



passport.use(new googlOAuth({
    // here is the credentials requried for the google authentication to work.
    clientID :  env.google_client_id , 
    clientSecret : env.google_client_secret , 
    // which requested URL to hit when the user is authenticated.
    callbackURL : env.google_call_back_url  , 
    passReqToCallback: true
} , 
    function(request,accessToken , refreshToken , profile , done){
        // creating new user or loggin the existing user.
        blockedUsers.findOne({email : profile.emails[0].value}, function(error , bUser){
            if(error){
                // incase of some error we notification to the user via Noty.
                request.flash("error","Something went wrong.") ; 
                return done(error) ; // giving done function error.
            }
            if(bUser){
                console.error("Email entered is banned.") ; 
                request.flash("error" , "Email entered is banned.") ; 
                return done(null , false) ; 
            }
        }) ;
        User.findOne({email : profile.emails[0].value}).exec(function(error , user){
            if(error){
                console.error(`Error in google stategy passport: ${error}`) ; 
                return ; 
            }
            console.log("*********************"+profile.emails+"*********************") ; 

            if(user){
                return done(null , user) ; 
            }else{
                User.create({
                    name : profile.displayName , 
                    email : profile.emails[0].value , 
                    // generating random 20 Bytes and then converting it to String where for number we are using
                    // hexdecimal number system.
                    password: crypto.randomBytes(20).toString("hex") 
                } , function(error , user){
                    if(error){
                        console.error("Error in creating a new user: " + error) ; 
                        return ; 
                    }
                    console.log(`New user created: \n` + user) ;
                    return done(null , user) ; 
                })
            }
        }) ; 
    }
))