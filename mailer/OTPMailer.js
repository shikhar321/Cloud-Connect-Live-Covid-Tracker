// attaining the required functionalities defined in the nodemailer file.
const nodeMialer = require("../config/nodemailer") ; 

module.exports.otpMailSender = function(userEmail , OTP){
    const htmlContent = nodeMialer.renderTemplate({email : userEmail , otp : OTP} , "/otp-mailer.ejs") ; 
    console.log("Mailer for OTP is Active now.") ; 

    // sending mail via transporter that has all credential stored in it at the time of creation and using
    // it has pre-defined function sendMial to send the mail.
    nodeMialer.transporter.sendMail({
        from : 'puru.bhargava011@gmail.com' , 
        to : userEmail , 
        subject : "OTP for Verfication" , 
        html : htmlContent
    } , function(error , info){ // also sending the callback function.
        if(error){
            console.log(`Check your Email Address!! ${error}`) ; 
            return ; 
        }
        console.log("Message Sent Successfully: " + info) ; 
        return ; 
    }) ;
}