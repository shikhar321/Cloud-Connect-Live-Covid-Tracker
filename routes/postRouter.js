const express = require("express") ; 

const router = express.Router() ; 
const passport = require("passport") ; 


const postController = require("../controllers/postController") ; 

router.post("/create-post",passport.checkAuthentication , postController.createPost) ; 

router.get("/delete-post/:id" , passport.checkAuthentication, postController.deletePost) ; 
router.post("/create-comments" , passport.checkAuthentication , postController.createComment)
router.get("/delete-comment/:id" , passport.checkAuthentication , postController.deleteComment) ; 
router.get("/toggle-like-post/:id" , passport.checkAuthentication , postController.togglelike) ; 
router.get("/toggle-dislike-post/:id" , passport.checkAuthentication , postController.toggledislike) ; 
router.get("/report-post/:id" , passport.checkAuthentication , postController.reportPost) ; 

module.exports = router ; 