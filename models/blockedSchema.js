const { timeStamp } = require("console");
const mongoose = require("mongoose") ; 
const path = require("path") ; 

const blockedUserSchema = new mongoose.Schema({
    email :{
        type: String , 
        required: true 
    }
},{
    timestamps: true 
}) ; 

const blockedUsers = mongoose.model("blockedUsers" , blockedUserSchema) ; 

module.exports = blockedUsers ; 