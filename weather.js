//Must set up a away verify when the user types in a city that doesnt exist


//pointers for search
var key="f315bcdf1cb4baa6f540676f13336a8c"
var history = $("#history");
var city = $("#current").find($("#city"));
var humidity = $("#current").find($("#humidity"));
var speedW = $("#current").find($("#speed"));
var tempature = $("#current").find($("#temp"));
var today= $("#current").find($("#today"));
var uv = $("#current").find($("#uv"));
var day1 = $("#box_1").find($("#day_1"));
var day2 = $("#box_2").find($("#day_2"));
var day3 = $("#box_3").find($("#day_3"));
var day4 = $("#box_4").find($("#day_4"));
var day5 = $("#box_5").find($("#day_5"));




//Will return search history
$(document).ready(function () {
    Today()
     if(localStorage.getItem("data-city") !== null){
         $("#history").attr("style","display:content");
        var city = localStorage.getItem("data-city");
        city = JSON.parse(city);
        console.log(city)
       
        for(var i =0; i < city.length; i++){
            var bt = $("<button>");
            bt.addClass("list-group-item");
            bt.addClass("list-group-item-action");
            bt.addClass("item")
            bt.attr("data-city",city[i]);
            bt.text(city[i]);
            $("#history").append(bt)

        }
        $("button.list-group-item.list-group-item-action").on("click",function(){
            var location = ($(this).attr("data-city"))
            refresh(location);
        })
    }
});



//hides items from the user until they're called upon.
$("#results").attr("style", "display:none");
$("#history").attr("style", "display:none");

//getting the uv index function which will change the color of the UV index depending on the value
function index(lat,lon){
    var jurl= "https://api.openweathermap.org/data/2.5/uvi/forecast?appid="+key+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url:jurl,
        method:"GET"
    }).then(function(info){
        var num = info[0].value;
        if(num  < 5){
            uv.addClass("btn btn-success");
        }
        if (num ===7){
            uv.addClass("btn btn-warning")
        }
        if(num > 7){
            uv.addClass("btn btn-danger")
        }
        uv.text("UV index ="+num)
    })


}


var input = [];

//current conditions function 
function Today() {
    $("#search_bt").on("click", function (event) {
        event.preventDefault();
        $("#history").empty();
        $("#history").attr("style", "display:content");
        input.push($("#look").val());
        console.log(input);
        localStorage.setItem("data-city",JSON.stringify(input));

        for(var i =0; i < input.length; i++){
            var bt = $("<button>");
            bt.addClass("list-group-item");
            bt.addClass("list-group-item-action");
            bt.attr("data-city",input[i]);
            bt.text(input[i]);
            $("#history").append(bt)
            cityName(input[i])
        }

       
    })
    
    
}
function cityName(input){
    var jUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input +"&appid="+key;
    $.ajax({
        url: jUrl,
        method: "GET"
    }).then(function (info) {
        console.log(info)
        $("#results").attr("style", "display:content");
        tempature.empty()
        var img = $("<img>")
        img.attr("src","https://openweathermap.org/img/wn/"+info.weather[0].icon+"@2x.png");
        //going to get todays date
        var newDate = new Date();
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
        var month = newDate.getMonth()
        var dayOfMonth = newDate.getDate()
        var year = newDate.getFullYear()
        var date = months[month] + "/" + dayOfMonth + "/" + year;
        var name = info.name;
        var temp = info.main.temp;
        var faren = ((temp - 273.15) * 1.80 +32);
        var lat = info.coord.lat;
        var lon =info.coord.lon;
        var hum = info.main.humidity;;
        var speed = info.wind.speed;
        var Uv = index(lat,lon);
        city.text(name);
        today.text("Today's date = "+date);
        city.append(img);
        humidity.text("Humidity = " + hum+ "%");
        speedW.text("Wind Speed = " + speed+" MPH");
        uv.text("UV Index = " + Uv)
        tempature.prepend("Tempature = "+parseInt(faren) + "&deg;" + "F");
  
    


}).catch(function(err){
    console.log("this ciry doesnt exist")
})
}

// 5 day weather forecast

$("#search_bt").on("click", function(event) {
    event.preventDefault();
    var input = $("#look").val();
    $("#history").attr("style", "display:content");
    var jUrl= "https://api.openweathermap.org/data/2.5/forecast?q="+input+"&units=imperial"+"&appid="+key;
    $.ajax({
        url:jUrl,
        method:"GET",
    }).then(function(info){
        var list = (info.list);
        var counter = 0;
        var arr=[];
         for(var i =0; i < list.length; i+=7){
                 arr.push(list[i]);
             }
             console.log(arr)
             var h1 = [day1.find($("#date_1")), day2.find($("#date_2")),day3.find($("#date_3")),day4.find($("#date_4")),day5.find($("#date_5"))];
             var tempature = [day1.find($("#temp_1")),day2.find($("#temp_2")),day3.find($("#temp_3")),day4.find($("#temp_4")),day5.find($("#temp_5"))];
             var humidity = [day1.find($("#humidity_1")),day2.find($("#humidity_2")),day3.find($("#humidity_3")),day4.find($("#humidity_4")),day5.find($("#humidity_5"))];
             var icon = [day1.find($("#icon_1")),day2.find($("#icon_2")),day3.find($("#icon_3")),day4.find($("#icon_4")),day5.find($("#icon_5"))];
             var counter  = 1;

             for(var b= 0; b < 5; b++){
                tempature[b].empty()
                icon[b].empty();
                var img = $("<img>");
                h1[b].text(new Date(arr[counter].dt_txt).toLocaleDateString("en-US"))
                tempature[b].append(arr[counter].main.temp+ "&deg;" + "F");
                humidity[b].text(arr[counter].main.humidity+"%");
                img.attr("src","http://openweathermap.org/img/wn/"+arr[counter].weather[0].icon+"@2x.png");
                icon[b].append(img)

            
                counter++;
             }
        
     })
})


///Button that can be used when page re-loads

function refresh(location){
    var jUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location +"&appid="+key;
    $.ajax({
    url: jUrl,
    method: "GET"
    }).then(function (info) {
        console.log(info)
        $("#results").attr("style", "display:content");
        tempature.empty()
        var img = $("<img>");
        img.attr("src","https://openweathermap.org/img/wn/"+info.weather[0].icon+"@2x.png");
        //going to get todays date
        var newDate = new Date();
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
        var month = newDate.getMonth()
        var dayOfMonth = newDate.getDate()
        var year = newDate.getFullYear()
        var date = months[month] + "/" + dayOfMonth + "/" + year;
        var name = info.name;
        var temp = info.main.temp;
        var faren = ((temp - 273.15) * 1.80 +32);
        var lat = info.coord.lat;
        var lon =info.coord.lon;
        var hum = info.main.humidity;;
        var speed = info.wind.speed;
        var Uv = index(lat,lon);
        today.text("Today's Date= "+date);
        city.text(name);
        city.append(img)
        humidity.text("Humidity = " + hum+ "%");
        speedW.text("Wind Speed = " + speed+" MPH");
        uv.text("UV Index = " + Uv)
        tempature.prepend("Tempature = "+parseInt(faren) + "&deg;" + "F");
  
    


})
.catch(function(err){
    console.log("history error")
})
var jUrl= "https://api.openweathermap.org/data/2.5/forecast?q="+location+"&units=imperial"+"&appid="+key;
$.ajax({
    url:jUrl,
    method:"GET",
}).then(function(info){
    console.log(info)
    var list = (info.list);
    var counter = 0;
    var arr=[];
     for(var i =0; i < list.length; i+=7){
             arr.push(list[i]);
         }
         var h1 = [day1.find($("#date_1")), day2.find($("#date_2")),day3.find($("#date_3")),day4.find($("#date_4")),day5.find($("#date_5"))];
         var tempature = [day1.find($("#temp_1")),day2.find($("#temp_2")),day3.find($("#temp_3")),day4.find($("#temp_4")),day5.find($("#temp_5"))];
         var humidity = [day1.find($("#humidity_1")),day2.find($("#humidity_2")),day3.find($("#humidity_3")),day4.find($("#humidity_4")),day5.find($("#humidity_5"))];
         var icon = [day1.find($("#icon_1")),day2.find($("#icon_2")),day3.find($("#icon_3")),day4.find($("#icon_4")),day5.find($("#icon_5"))];
         var counter  = 1;
         for(var b= 0; b < 5; b++){
            tempature[b].empty()
            icon[b].empty();
            var img = $("<img>");
            icon[b].empty();
            h1[b].text(new Date(arr[counter].dt_txt).toLocaleDateString("en-US"));
            tempature[b].append(arr[counter].main.temp+ "&deg;" + "F");
            humidity[b].text(arr[counter].main.humidity+"%");
            img.attr("src","https://openweathermap.org/img/wn/"+arr[counter].weather[0].icon+"@2x.png");
            icon[b].append(img);
        
            counter++;
         }
    
 })
}

