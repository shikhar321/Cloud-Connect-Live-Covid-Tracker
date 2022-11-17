(function(){
    "use strict"

    console.log("Script Loaded!!") ; 
    var xhrRequest = new XMLHttpRequest() ; 
    xhrRequest.open("get" , "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json" , true) ; 
    xhrRequest.send() ; 
    xhrRequest.onload = function(){
        document.getElementById("new-main-container").innerHTML = `` ; 
        var responseJSON = JSON.parse(xhrRequest.response);
        var newsAll = responseJSON.articles ; 
        console.log(newsAll) ; 

        for(let news of newsAll){
            document.getElementById("new-main-container").innerHTML += 
            `
            <div class="latest-news-card" >
                <div class="latest-news-card-heading">
                    ${news.title}
                </div>
                <div class="latest-news-card-content">
                    ${news.content} &nbsp; &nbsp; 
                </div>
                <a target= "_blank"href="${news.url}" class = "real-link">Click here to See Full Article </a>
            </div>
            `
        }
    }
})() ;  