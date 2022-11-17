// attaining the required functionalities defined in the nodemailer file.
const nodeMialer = require("../config/nodemailer") ; 

module.exports.newComment = function(comment , userEmail , userName){
    const htmlContent = nodeMialer.renderTemplate({comment: comment , email : userEmail , name : userName } , "/commentAddedMail.ejs") ; 
    console.log("Mailer for Comment Added is Active now.") ; 

    // sending mail via transporter that has all credential stored in it at the time of creation and using
    // it has pre-defined function sendMial to send the mail.
    nodeMialer.transporter.sendMail({
        from : 'puru.bahrgava011@gmail.com' , 
        to : userEmail , 
        subject : "New Comment Added" , 
        html : htmlContent
    } , function(error , info){ // also sending the callback function.
        if(error){
            console.log(`Something went wrong!! ${error}`) ; 
            return ; 
        }
        console.log("Message Sent Successfully: " + info) ; 
        return ; 
    }) ;
}