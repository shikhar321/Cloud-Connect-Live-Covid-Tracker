const mongoose = require("mongoose") ; 
// we will require multer module to store the upload
const aws = require("aws-sdk") ; 
const multer = require("multer") ; 
const multerS3 = require("multer-s3-v3") ; 
const path = require("path") ; 
const POST_PATH = path.join('uploads/users/posts') ; 

const postSchema = new mongoose.Schema({
    title : {
        type : String , 
        required: true 
    } , 
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : "users"
    } , 
    postDescription : {
        type : String , 
        
    } , 
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "comments" 
        }
    ] , 
    // for storing the path of post images and we need to store more than one path so we will require
    // array of type string. 
    postImages : [
        {
            type : String 
        }
    ] , 
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref: "users"
        }
    ] , 
    dislikes : [
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref: "users"
        }
    ] , 
    reports :[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "users" 
        }
    ]
} , {
    timestamps : true 
}) ; 

const s3 = new aws.S3({
    accessKeyId: "AKIAVTUGPCPAA54BN27X" , 
    secretAccessKey: "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" , 
    region :  "us-east-2"
}) ; 

// Now telling the multer about the where is the storage and what is the name of the file storage. 
const storage2=  multerS3({
    s3,
    bucket: 'cloudconnectimages',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: `${file.fieldname}`});
    },
    key: function (req, file, cb) {
      cb(null, `image-${Date.now()}.jpeg`) ; 
    }
  }) 

//setting a function named uploadedPostImages in the statics property of the postSchema that is taken care 
// by the multer we just need to tell that tell it the storage and it takes array of inputs.
postSchema.statics.uploadedPostImages = multer({storage : storage2}).array("postImages",10);

// setting the path of storage in the statics property of the userSchema for future use.
postSchema.statics.imagesPath = POST_PATH ; 

// creating posts document using the postSchema.
const posts = mongoose.model("posts" , postSchema) ; 

module.exports = posts ; 