(function () {
    "use strict"
    console.log("Script Loaded");
    var isPostButtonClicked = false;
    var isBioButtonClicked = false;

    if (document.getElementsByClassName("create-post-form")[0].getAttribute("data-isAllJsNeeded") == "true") {
        document.getElementsByClassName("create-post-button")[0].addEventListener("click", function (event) {
            event.stopPropagation();
            if (isBioButtonClicked) {
                document.getElementsByClassName("add-about-yourself-form")[0].style.display = "none";
                document.getElementsByClassName("profile-constainer")[0].style.height = "400px";
                document.getElementsByClassName("move-up-whole")[0].style.top = "-60px";
                document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "220px"
                isBioButtonClicked = false;
            }
            if (!isPostButtonClicked) {
                document.getElementsByClassName("create-post-form")[0].style.display = "block";
                document.getElementsByClassName("create-post-form")[0].style.position = "relative";
                document.getElementsByClassName("create-post-form")[0].style.top = "-400px"
                document.getElementsByClassName("profile-constainer")[0].style.height = "900px"
                document.getElementsByClassName("fas fa-sort-down fa-2x")[0].setAttribute("class", "fas fa-sort-up fa-2x");
                document.getElementsByClassName("fas fa-sort-up fa-2x")[0].style.position = "relative";
                document.getElementsByClassName("fas fa-sort-up fa-2x")[0].style.top = "6px";
                document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "-220px"
                document.getElementsByClassName("move-up-whole")[0].style.top = "-200px";
                isPostButtonClicked = true;
            } else {
                document.getElementsByClassName("create-post-form")[0].style.display = "none";
                document.getElementsByClassName("profile-constainer")[0].style.height = "400px";
                document.getElementsByClassName("fas fa-sort-up fa-2x")[0].setAttribute("class", "fas fa-sort-down fa-2x ");
                document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.position = "relative";
                document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.top = "-4px";
                document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "120px"
                document.getElementsByClassName("move-up-whole")[0].style.top = "120px";
                isPostButtonClicked = false;
            }
        });


        document.getElementsByClassName("add-about-yourself")[0].addEventListener("click", function (event) {
            event.stopPropagation();
            if (isPostButtonClicked) {
                document.getElementsByClassName("create-post-form")[0].style.display = "none";
                document.getElementsByClassName("profile-constainer")[0].style.height = "400px";
                document.getElementsByClassName("fas fa-sort-up fa-2x")[0].setAttribute("class", "fas fa-sort-down fa-2x ");
                document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.position = "relative";
                document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.top = "-4px";
                document.getElementsByClassName("move-up-whole")[0].style.top = "-300px";
                isPostButtonClicked = false;
            }
            if (!isBioButtonClicked) {
                document.getElementsByClassName("add-about-yourself-form")[0].style.display = "block";
                document.getElementsByClassName("add-about-yourself-form")[0].style.position = "relative";
                document.getElementsByClassName("add-about-yourself-form")[0].style.top = "-300px"
                document.getElementsByClassName("profile-constainer")[0].style.height = "800px"
                document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "-120px"
                document.getElementsByClassName("move-up-whole")[0].style.top = "-100px";
                isBioButtonClicked = true;
            }
            else {
                document.getElementsByClassName("add-about-yourself-form")[0].style.display = "none";
                document.getElementsByClassName("profile-constainer")[0].style.height = "400px";
                document.getElementsByClassName("move-up-whole")[0].style.top = "120px";
                document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "120px"
                isBioButtonClicked = false;
            }
        });
    }

    var commentSection = document.getElementsByClassName("view-comment-section");

    for (let i = 0; i < commentSection.length; i += 1) {
        commentSection[i].addEventListener("click", function (event) {
            event.stopPropagation();

            if (commentSection[i].getAttribute("data-isVisible") == "false") {
                document.getElementsByClassName("comment-section")[i].style.display = "block";
                document.getElementsByClassName("comment-box")[i].style.borderRadius = "0px";
                document.getElementsByClassName("comment-box")[i].style.borderBottom = "0px";
                commentSection[i].setAttribute("data-isVisible", "true");

            }
            else {
                document.getElementsByClassName("comment-section")[i].style.display = "none";
                document.getElementsByClassName("comment-box")[i].style.borderRadius = "0px 0px 20px 20px"
                document.getElementsByClassName("comment-box")[i].style.borderBottom = "5px solid white";
                commentSection[i].setAttribute("data-isVisible", "false");
            }
        });
    }



    document.getElementsByClassName("show-comment-button")[0].addEventListener("click", function (event) {
        event.stopPropagation();
        document.getElementsByClassName("move-up-whole")[0].style.display = "none";
        document.getElementsByClassName("comment-main-card")[0].style.display = "block"
        document.getElementsByClassName("comment-main-card")[0].style.top = "120px"
    });

    document.getElementsByClassName("show-post-button")[0].addEventListener("click", function (event) {
        event.stopPropagation();
        document.getElementsByClassName("comment-main-card")[0].style.display = "none";
        document.getElementsByClassName("move-up-whole")[0].style.display = "block";
    });



    var leftBtn = document.getElementsByClassName("slide-image-left");
    var rightBtn = document.getElementsByClassName("slide-image-right");
    var imageScreen = document.getElementsByClassName("large-image-box");
    var currentPos = [];

    for (let i = 0; i < leftBtn.length; i += 1) {
        currentPos.push(0);
    }


    for (let i = 0; i < leftBtn.length; i += 1) {
        leftBtn[i].addEventListener("click", function (event) {
            event.stopPropagation();
            if (currentPos[i] < 0) {
                currentPos[i] += 500;
                imageScreen[i].style.left = currentPos[i].toString() + "px";
            }
        });

        rightBtn[i].addEventListener("click", function (event) {
            event.stopPropagation();
            console.log(imageScreen[i].getAttribute("data-imageNumber"));
            let factor = parseInt(imageScreen[i].getAttribute("data-imageNumber")) - 1;
            console.log(factor);
            if (currentPos[i] > (factor * 500) * (-1)) {
                currentPos[i] -= 500;
                imageScreen[i].style.left = currentPos[i].toString() + "px";
            }

        });
    }

    $(".delete-button").click(function(event){
        console.log("hello") ; 
        event.preventDefault() ; 
        let parent = $(event.target).parent()
        $.ajax({
            type : "get" ,
            url : $(parent).prop('href'),  
            success : function(data){
                
                $(`#post-${data.data.postId}`).remove() ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: "Post Deleted Successfully !!!" , 
                    type : "success" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            } , 
            error : function(error){
                console.log(error.responseText) ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: `Something went wrong !!!` , 
                    type : "error" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            }
        })
    }) ; 


    $(".like").click(function(event){
        
        event.preventDefault() ; 
        let parent = $(event.target).parent() ; 
        $.ajax({
            type : "get" , 
            url : $(parent).prop('href'), 
            success : function(data){
                 
                if(data.data.isLiked){
                    $(`#like-${data.data.postId}`).html(`
                        <i class="far fa-thumbs-up fa-2x"></i>
                        <font>${data.data.likes}</font>
                    `) ; 

                    new Noty({
                        theme: 'semanticui' , 
                        text: "Unliked Post !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show() 
                }else{
                    $(`#like-${data.data.postId}`).html(`
                        <i class="fas fa-thumbs-up fa-2x"></i>
                        <font>${data.data.likes}</font>
                    `) ; 
                    new Noty({
                        theme: 'semanticui' , 
                        text: "Liked Post !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show() 
                }
                if(data.data.wasDisLiked){
                    $(`#dislike-${data.data.postId}`).html(`
                        <i class="far fa-thumbs-down fa-2x"></i>
                        <font>${data.data.dislikes}</font>
                    `)
                }
            } , 
            error : function(error){
                console.log(error.responseText) ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: `Something went wrong !!!` , 
                    type : "error" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            }
        })
    }) ; 


    $(".dislike").click(function(event){
        
        event.preventDefault() ; 
        let parent = $(event.target).parent() ; 
        $.ajax({
            type : "get" , 
            url : $(parent).prop('href'), 
            success : function(data){
                console.log("hello" , data.data.postId) ; 
                if(data.data.isdisLiked){
                    $(`#dislike-${data.data.postId}`).html(`
                        <i class="far fa-thumbs-down fa-2x"></i>                        
                        <font>${data.data.dislikes}</font>
                    `) ;
                    new Noty({
                        theme: 'semanticui' , 
                        text: "Undo Dislike !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show() 
                }else{
                    $(`#dislike-${data.data.postId}`).html(`
                        <i class="fas fa-thumbs-down fa-2x"></i>
                        <font>${data.data.dislikes}</font>
                    `) ; 
                    
                    new Noty({
                        theme: 'semanticui' , 
                        text: "Disliked Post !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show() 
                }
                if(data.data.wasLiked){
                    $(`#like-${data.data.postId}`).html(`
                        <i class="far fa-thumbs-up fa-2x"></i>
                        <font>${data.data.likes}</font>
                    `)
                }
            } , 
            error : function(error){
                console.log(error.responseText) ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: `Something went wrong !!!` , 
                    type : "error" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            }
        })
    }) ; 


   
    $(".delete-button").click(function(event){
        
        event.preventDefault() ; 
        let parent = $(event.target).parent() ; 
        $.ajax({
            type : "get" , 
            url : $(parent).prop('href'), 
            success : function(data){
                $(`#comment-card-${data.data.commentId}`).remove()  ;
                $(`#comments-${data.data.postId}`).html(`
                    <i class="far fa-comment-alt fa-2x"></i>
                    <font>${data.data.comments}</font>
                `)
                new Noty({
                    theme: 'semanticui' , 
                    text: `Comment Removed !!!` , 
                    type : "success" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            } , 
            error : function(error){
                console.log(error.responseText) ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: `Something went wrong !!!` , 
                    type : "error" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            }
        })
    }) ; 


    $(".comment-box").submit(function(event){
        
        event.preventDefault() ; 
        let element = $(event.target) ; 
        $.ajax({
            type : "post" , 
            url : $(element).prop('action'), 
            data: $(element).serialize(),
            success : function(data){

                let date = new Date() ; 
                let newComment = `
                <div class="comment-card" id = "comment-card-${data.data.commentId}">
                    <div class="comment-creater">
                        <i class="fas fa-user-circle"></i> ${data.data.commentCreater}
                    </div><br>
                    <div class="comment">
                        ${data.data.commentContent}
                    </div>
                    <div class="comment-date">
                        ${date} 
                    </div>
                    <a class="delete-button-comments" href="/posts/delete-comment/${data.data.commentId}" >
                            <i class="fas fa-trash-alt "></i>
                    </a>
                </div>
                ` ; 

                console.log(data.data.commentId) ; 

                $(`#comment-area-${data.data.postId}`).prepend(newComment) ; 
                delComment() ; 

                $(`#comments-${data.data.postId}`).html(`
                    <i class="far fa-comment-alt fa-2x"></i>
                    <font>${data.data.comments}</font>
                `) ; 

                $(".no-comments-heading").html("") ; 



                new Noty({
                    theme: 'semanticui' , 
                    text: `Comment Added !!!` , 
                    type : "success" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            } , 
            error : function(error){
                console.log(error.responseText) ; 

                new Noty({
                    theme: 'semanticui' , 
                    text: `Something went wrong !!!` , 
                    type : "error" , 
                    layout : "topRight" , 
                    timeout : 1500 
                }).show() 
            }
        })
    }) ; 



    let delComment = function(){
        $(".delete-button-comments").click(function(event){
         
            event.preventDefault() ; 
            let parent = $(event.target).parent() ; 
            $.ajax({
                type : "get" , 
                url : $(parent).prop('href'), 
                success : function(data){
                    
                    
                    $(`#comment-card-${data.data.commentId}`).remove(); 
                    $(`#comments-${data.data.postId}`).html(`
                        <i class="far fa-comment-alt fa-2x"></i>
                        <font>${data.data.comments}</font>
                    `)
    
                    new Noty({
                        theme: 'semanticui' , 
                        text: `Comment Removed !!!` , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show()
    
    
                } , 
                error : function(error){
                    console.log(error.responseText) ; 
    
                    new Noty({
                        theme: 'semanticui' , 
                        text: `Something went wrong !!!` , 
                        type : "error" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show() 
                }
            })
        }) ; 
        
    }

    delComment() ; 

  


   


    // let newPostForm = $("#create-post");
    // console.log("hello", newPostForm);

    // newPostForm.submit(function (event) {
    //     event.preventDefault();

    //     $.ajax({
    //         type: "post",
    //         url: '/posts/create-post',
    //         data: newPostForm.serialize(),
    //         success: function (data) {
    //             console.log(data) ; 
    //             var newPost = createAPost(data.data.post);
    //             $("#post-section").prepend(newPost) ; 
    //             console.log(newPost) ; 
    //         },
    //         error: function (error) {
    //             console.error(error.resposneText);
    //         }
    //     });
    // })
    // function makingImagesOfPost(images){
    //     var imagesOfPost = `<img src="/images/dummy.webp" height="100%" width="100%">` ; 
    //     var flag = true ; 
    //     for(let image of images){
    //         if(flag){
    //             imagesOfPost = `` ; 
    //             flag = false ; 
    //         }
    //         imagesOfPost += `<img src="/${image}" height="100%" width="100%" class="image-screen" >` ; 
    //     }
    //     return imagesOfPost ; 
    // }
    // function getComemnts(comments){
    //     var commentsOfPost = `<h2>
    //         No Comments Available.
    //     </h2>` ; 
    //     var flag = true ; 
    //     for(let comment of comments){
    //         if(flag){
    //             commentsOfPost = ` ` ; 
    //             flag = false ; 
    //         }
    //         commentsOfPost += ` 
    //         <div class="comment-card" >
    //             <div class="comment-creater">
    //                 <i class="fas fa-user-circle"></i> ${ comment.user.name}
    //             </div><br>
    //             <div class="comment">
    //                 ${comment.content}
    //             </div>
    //             <div class="comment-date">
    //                 ${comment.user.createdAt}
    //             </div>
    //             <a class="delete-button-comments" href="/posts/delete-comment/<%= comment._id %>" >
    //                 <i class="fas fa-trash-alt "></i>
    //             </a>
    //         </div>`
    //     }
    //     return commentsOfPost ;
    // }
    // function createAPost(post) {
    //     var imagesOfPost = makingImagesOfPost(post.postImages) ; 
    //     var commentsOFPost = getComemnts(post.comments) ; 
    //     var baseElement = 
    //     `<div class="post-card">
    //     <div class="post-image">
    //                 <i class="fas fa-angle-left fa-3x slide-image-left"></i>
    //                 <i class="fas fa-angle-right fa-3x slide-image-right" ></i>
    //             <div class="large-image-box" data-imageNumber="${post.postImages.length}">`+ imagesOfPost 
    //             + '</div></div>' + 
    //         `<div class="post-info-part">
    //             <div class="post-heading">
    //                 ${post.title}
    //             </div>
    //             <div class="post-description" style="white-space: pre-line;" >
    //                 ${post.postDescription}
    //             </div>
    //         </div>` +
    //         `<div class="post-buttons">
    //         <div>
    //             <i class="far fa-thumbs-up fa-2x"></i>
    //             <font>69M</font>
    //         </div>
    //         <div>
    //             <i class="far fa-thumbs-down fa-2x"></i>
    //             <font>69</font>
    //         </div>
    //         <div class="view-comment-section">
    //             <i class="far fa-comment-alt fa-2x"></i>
    //             <font>${post.comments.length}</font>
    //         </div>

    //         <a class="delete-button" href="/posts/delete-post/${post._id}" >
    //             <i class="fas fa-trash-alt fa-2x"></i>
    //         </a>
    //         </div>
    //         </div>

    //     <div>
    //         <form method="POST" action="/posts/create-comments" class="comment-box">
    //             <label for="comment"><i class="fas fa-2x fa-comment-alt"></i></label>
    //             <input placeholder="Type here to Comment" type="text" maxlength="200" name="comment" id="comment">
    //             <input type="hidden" value="<%= post._id%>" name="postID">
    //             <button class="comment-button"><i class="fas fa-pencil"></i> &nbsp;Comment</button>
    //         </form>
    //     </div>
    //         ` + commentsOFPost ; 
    //     return baseElement ; 
    // }
})();  