(function () {
    "use strict" 
    
    console.log("Script Loaded");

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
        console.log("hello") ; 
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
        console.log("hello") ; 
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


    $(".report-button").click(function(event){
        console.log("hello") ; 
        event.preventDefault() ; 
        let parent = $(event.target).parent() ; 
        $.ajax({
            type : "get" , 
            url : $(parent).prop('href'), 
            success : function(data){
                if(data.data.wasReported){
                    new Noty({
                        theme: 'semanticui' , 
                        text: "Post Already Reported !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show()
                }else{
                    new Noty({
                        theme: 'semanticui' , 
                        text: "Post Reported !!!" , 
                        type : "success" , 
                        layout : "topRight" , 
                        timeout : 1500 
                    }).show()
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


    document.getElementById("notification-button").addEventListener("click" , function(event){
        event.stopPropagation() ; 

        document.getElementById("notification-bar").style.display = "block" ; 

    }) ; 
    document.getElementById("close-noti-bar").addEventListener("click" , function(event){
        event.stopPropagation() ; 

        document.getElementById("notification-bar").style.display = "none" ; 
    }) ; 

})();  