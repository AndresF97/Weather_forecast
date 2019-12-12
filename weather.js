//URL webs

//pointers for search


//Will return search history
$(document).ready(function(){

});

//hides items from the user until they're called upon.
$("#results").attr("style","display:none");
$("#history").attr("style","display:none");


    
    // jUrl="https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid=f315bcdf1cb4baa6f540676f13336a8c";
    // $.ajax({
    //     url:jUrl,
    //     method:"GET"
    // }).then(function(info){
    //     var city; 
    //     var temp;
    //     var hum;
    //     var speed;
    //     var Uv; 

    // })

//current conditions function 
$("#search_bt").on("click",function(event){
    event.preventDefault();
    var input = $("#look").val();
    console.log(input);
})