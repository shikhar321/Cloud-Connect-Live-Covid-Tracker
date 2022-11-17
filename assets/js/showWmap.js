(function(){
    "use strict" 
    console.log("script loaded!!") ; 


    var xhrRequest = new XMLHttpRequest() ; 
    xhrRequest.open("get" , "https://corona.lmao.ninja/v2/countries?yesterday&sort" , true) ; 
    xhrRequest.send() ; 
    let values = {} ; 
    xhrRequest.onload = function(){
        var countries = JSON.parse(xhrRequest.response);
        for(let country of countries){
            let temp = {} ; 
            temp.total = country.cases ; 
            temp.deaths = country.deaths ; 
            temp.recovered = country.recovered ; 
            temp.active = country.active ; 
            values[country.countryInfo.iso2] = temp ; 
        }
    }

    console.log(values) ; 


    new svgMap({
        targetElementID: 'svgMap',
        data: {
          data: {
            total : {
                name : 'Total Cases' , 
                format : "{0}" , 
                thousandSeparator: ','
            } , 
            deaths:{
                name : 'Total Deaths' , 
                format : "{0}" , 
                thousandSeparator: ','
            } , 
            recovered :{
                name : 'Total Recovered' , 
                format : "{0}" , 
                thousandSeparator: ','
            } , 
            active :{
                name : 'Active Cases' , 
                format : "{0}" , 
                thousandSeparator: ','
            }
          },
          applyData: 'define',
          values: values
        }
      });
})() ;  