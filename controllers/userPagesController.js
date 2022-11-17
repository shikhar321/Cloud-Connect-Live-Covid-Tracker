// Some of the DB documents required for the this controllere file to function properly.
const users = require("../models/userInfoSchema") ; 
const post = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const blockedUsers = require("../models/blockedSchema") ; 
const notifications = require("../models/notifications") ; 
const OTP = require("../models/otpSchema") ; 

const otpMailer = require("../mailer/OTPMailer") ; 

const { populate } = require("../models/userInfoSchema");

// these are the required modules for the controller file to work.
const res = require("express/lib/response");
const path = require("path") ; 
const fs = require("fs") ; 
const req = require("express/lib/request");

// controller function to make new user in Datebase.
module.exports.createNewUser = function(request , response){
    // First of checking the confirm password and passord should match if not then give notifiaction to user
    // via Noty 
    blockedUsers.findOne({email : request.body.email} , function(error , bUser){
        if(error){
            //if error then give notification via Noty.
            console.log(`Something went wrong: ${error}`) ;
            request.flash("error" , "Something went wrong.")  ; 
            return response.redirect("back") ; // and going back.
        }
        if(bUser){
            console.error("Email entered is banned.") ; 
            request.flash("error" , "Email entered is banned.") ; 
            return response.redirect("/sign-in") ;
        }
    }) ;
    
    if(request.body.password != request.body.CPassword){
        console.error("Password entered not same.") ; 
        request.flash("error" , "Password entered not same.")
        return response.redirect("back") ; // and going back.
    }
    // Then finding the user via email input field so that we can check that the user 
    // already exists or not.
    users.findOne({email : request.body.email} , function(error , user){
        if(error){
            //if error then give notification via Noty.
            console.log(`Something went wrong: ${error}`) ;
            request.flash("error" , "Something went wrong.")  ; 
            return response.redirect("back") ; // and going back.
        }
        if(user){
            // If the user is found the user is already so give notification of this via 
            // Noty.
            console.error("Email Already in use!") ; 
            request.flash("error" , "Email already in use.") ; 
            return response.redirect("/sign-in") ; // and going to sign-in page.
        }
        var uid ; 
        if(!user){
            // if user is not there then we are creating the one.
            

            var randomString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ; 
            var genOTP = (Math.floor(Math.random()*10000)) + 
            randomString[(Math.floor(Math.random()*100) % 52)]+
            randomString[(Math.floor(Math.random()*100) % 52)]+
            randomString[(Math.floor(Math.random()*100) % 52)]+
            randomString[(Math.floor(Math.random()*100) % 52)];

            OTP.create({
                OTP : genOTP, 
                email : request.body.email , 
                name : request.body.name , 
                password : request.body.password , 
                personlInfo : request.body.Bio , 
                postBlocked : 0  , 
                avatar : null 
            } , function(error , OTPUser){
                if(error){
                    console.log("Something Went wrong !bnf!: " + error) ; 
                    users.deleteOne({email : request.body.email} , function(error){
                        if(error){
                            console.log("Something Went Wrong"); 
                        }
                    }) ; 
                    request.flash("error" , "Something went wrong") ; 
                    response.redirect("/sign-up") ; 
                }

                otpMailer.otpMailSender(request.body.email , genOTP) ;
                return response.redirect("/otp-page") ; // and then go to otp page.
            }); 
        }
    }) ; 
}  

module.exports.checkOTP = async function(request , response){
    var checkedOTP = await OTP.findOne({OTP : request.body.OTP}) ; 

    if(checkedOTP){
        users.create({
            email : checkedOTP.email , 
            name : checkedOTP.name , 
            password : checkedOTP.password , 
            personlInfo : checkedOTP.Bio , 
            postBlocked : 0  , 
            avatar : null 
        } , function(error , newUser){
            if(error){
                //if error then give notification via Noty.
                console.error(`Error in creating new User: ${error}`) ; 
                request.flash("error" , "Error in creating user") ; 
                return response.redirect("back") ; 
            }
            // if user is created successful then we give notication via noty for successful account 
            // creation. 
            console.log(`New User Created Succesfully : ${newUser}`) ;    
        }) ; 
        request.flash("success" , "Verification was Successful !!") ; 
        OTP.deleteOne({OTP : request.body.OTP} , function(error){
            if(error){
                console.log(`Something went wrong: ${error}`) ; 
            }
        }) ; 
        return response.redirect("/sign-in") ; 
    }
    else{
        request.flash("error" , "OTP Entered is wrong !!") ; 
        OTP.deleteOne({OTP : request.body.OTP} , function(error){
            if(error){
                console.log(`Something went wrong: ${error}`) ; 
            }
        }) ;
        return response.redirect("/sign-up") ; 
    }

}

// made this controller function asynchronous so one function is executed before moving to next.
module.exports.showProfile = async function(request , response){
    try{
        // finding the post of the user 
        let posts = await post.find({user : request.params.id})
        .populate("user") // then populating the user field  with info user info it is ref to via user ID.
        .populate({
            path: "comments" , // populating all comments with comments its refering to via it comment ID its refering to.
            populate: {     // then populating the each comment's field user with user's info it is refering to.
                path: "user"
            }
        });
        
        console.log("showing posts") ; 
        console.log(posts) ; 
        

        posts.reverse() ; // reversing the post array so as to get most recent post at the top.
        let user = await users.findById(request.params.id) ; // then finding the targeted user of which profile is
        // being openned.

        // Then finding all the comments being made by the user whose profile is bieng openned. 
        let allComments = await comments.find({user: request.params.id}).
        populate("user");  // then populating the each comment's field user with user it is refering to.


        console.log(user) ; 
        allComments.reverse() ; // reversing the comments array so as to get most recent post at the top.
        return response.render("userProfile" , {
            layout : "userProfile.ejs" , 
            posts : posts , 
            isHome : false ,
            targetUser : user , 
            allComments : allComments 
        }) ;
    }
    catch(error){
        //if error then give notification via Noty.
        console.error(`Sonething went wrong --> ${error}`) ; 
        request.flash("error" , "Something went wrong") ; 
        response.redirect("back") ; // and going back.
    }
}
  
// made this controller function asynchronous so one function is executed before moving to next.
module.exports.showHomePage = async function(request , response){
    try{
        //finding all the posts in db.
        let posts = await post.find({})
        .populate("user") // then populating the user field  with info user info it is ref to via user ID.
        .populate({
            path : "comments" , // populating all comments with comments its refering to via it comment ID its refering to.
            populate : { // then populating the each comment's field user with user's info it is refering to.
                path : "user"
            }
        }) ; 
        let notis = await notifications.find({owner: request.user._id}) ; 

        notis.reverse() ; 
        posts.reverse() ; // reversing the post array so as to get most recent post at the top.
        return response.render("userHomePage.ejs" , {
            layout : "userHomePage.ejs" , 
            posts : posts ,
            isHome : true , 
            notis : notis 
        }) ;
    }catch(error){
        //if error then give notification via Noty.
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error" , "Something went wrong") ;
        return response.redirect("back") ; // and going back.
    }
}
// below controller function is used to update or add Bio for the Logged in user.
module.exports.addBio = async function(request , response){
    try{
        // finding the user via user id passed on through params.
        let user = await users.findById(request.params.id)  ; 
        // using the multer function defined in the schema.
        
        users.uploadedAvatar(request , response , function(error){
            if(error){
                // if error then give notification via multer.
                console.error(`Something went wrong: ${error}`) ; 
                request.flash("error" , "Something went wrong") ; 
                return response.redirect("back") ; 
            }
            if(request.body.Bio){
                //  if bio is there then we set or update the personalInfo.
                user.personlInfo = request.body.Bio ; 
                request.flash("success" , "Bio Updated Successfully") ; 
            }
            if(request.file){
                // If there is avatar file  then we need to update or set avatar file
                console.log(`$$$$$$$$$$$$$$ ${request.file} @@@@@@@@@@@@@@@222`) ; 
                
                // now setting the avatar's path in the avatar of the user
                user.avatar =  request.file.location; 
                console.log(request.file) ; 
                
                request.flash("success" , "Bio Updated Successfully") ; 
            }
            // Now making the changes permanent not changing in RAM only.
            user.save() ; 
            return response.redirect("back") ; 
        }) ; 
    }catch(error){
        // return back if error and give notification via Noty.
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error","Something went wrong") ;  
        return response.redirect("back") ; 
    }
}
// setting up home page for the valid users. 
module.exports.createSessionForValidUserMainMethod = function(request , response){
    request.flash("success" , "Logged in Successfully!!!") ; 
    return response.redirect("/users/home-page") ; 
}

module.exports.destroySession = function(request , resposne){
    request.logout() ; 
    // Passport exposes a logout() function on req (also aliased as logOut() ) 
    // that can be called from any route handler which needs to terminate a login session.
    request.flash("success" , "Logged out Successfully!!!") ; 
    return resposne.redirect("/") ; 
}

// rendering the live Update page.
module.exports.showLiveUpdates = function(request , response){
    return response.render("liveUpdates" , {
        layout : "liveUpdates.ejs" 
    }) ; 
}
// rendering the Show Vaccination Center page.
module.exports.showVaccinationCenter = function(request , response){
    return response.render("showVac" , {
        layout : "showVac.ejs"
    }) ; 
}
// rendering the Show About US page.
module.exports.showAboutUS = function(request , response){
    return response.render("showAboutUs", {
        layout : "showAboutUs.ejs" 
    }) ; 
}
// rendering the Show World Map page.
module.exports.showWmap = function(request , response){
    return response.render("showWmap" , {
        layout: "showWmap.ejs" 
    }) ; 
}
// rendering the Show Latest News page.
module.exports.showLnews = function(request , response){
    return response.render("showLNews" , {
        layout : "showLNews.ejs" , 
        nothing: "true"
    }) ; 
}
