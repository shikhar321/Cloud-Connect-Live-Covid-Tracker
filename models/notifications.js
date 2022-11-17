const mongoose = require("mongoose") ; 


const notificationSchema = mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId , 
        require: true 
    }, 
    timestamp : {
        type: String 
    } , 
    content :{
        type: String
    } , 
    type: {
        type: String 
    }
}) ; 

const notification = mongoose.model("notification" , notificationSchema) ; 

module.exports = notification ; 