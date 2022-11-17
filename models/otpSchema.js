const mongoose = require("mongoose") ; 

const OTPschema = mongoose.Schema({
    OTP : {
        type: String 
    } , 
    email : {
        type : String , 
        required: true , 
        unique : true
    } , 
    password : {
        type: String , 
        required : true 
    } , 
    name : {
        type: String , 
        required : true 
    } , 
    personlInfo :{
        type: String 
    } , 
    avatar: {
        type : String 
    } , 
    postBlocked: {
        type: Number 
    }
} , {
    timestamps : true 
}) ; 

OTPschema.index({createdAt: 1},{expireAfterSeconds: 120});

const OTP = mongoose.model("OTP" , OTPschema) ; 

module.exports = OTP ; 