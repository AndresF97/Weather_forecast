//URL webs

//pointers for search
var key="f315bcdf1cb4baa6f540676f13336a8c"
var history = $("#history");
var city = $("#current").find($("#city"));
var humidity = $("#current").find($("#humidity"));
var speedW = $("#current").find($("#speed"));
var tempature = $("#current").find($("#temp"));
var uv = $("#current").find($("#uv"));
var day1 = $("#box_1").find($("#day_1"));
var day2 = $("#box_2").find($("#day_2"));
var day3 = $("#box_3").find($("#day_3"));
var day4 = $("#box_4").find($("#day_4"));
var day5 = $("#box_5").find($("#day_5"));




//Will return search history
$(document).ready(function () {
    Today()

});

//hides items from the user until they're called upon.
$("#results").attr("style", "display:none");
$("#history").attr("style", "display:none");

//getting the uv index function 
function index(lat,lon){
    var jurl= "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="+key+"&lat="+lat+"&lon="+lon;
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




//current conditions function 
function Today() {
    $("#search_bt").on("click", function (event) {
        tempature.empty()
        event.preventDefault();
        $("#history").attr("style", "display:content");
        var input = []
        input.push($("#look").val());
        for(var i =0; i < input.length; i++){
            var bt = $("<button>");
            bt.addClass("list-group-item");
            bt.addClass("list-group-item-action");
            bt.attr("data-city",input);
            localStorage.setItem("data-city",JSON.stringify(input))
            bt.text(input);
            $("#history").append(bt)
        }



        var jUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input +"&appid="+key;
        $.ajax({
            url: jUrl,
            method: "GET"
        }).then(function (info) {
            console.log(info)
            $("#results").attr("style", "display:content");
            var img =$("<img>");
            //img.attr("src","http://openweathermap.org/img/wn/"+info.weather[0].icon+"@2x.png")
            var name = info.name;
            //name.append(img);
            var temp = info.main.temp;
            var faren = ((temp - 273.15) * 1.80 +32);
            var lat = info.coord.lat;
            var lon =info.coord.lon;
            var hum = info.main.humidity;;
            var speed = info.wind.speed;
            var Uv = index(lat,lon);
            city.text(name);
            humidity.text("Humidity = " + hum+ "%");
            speedW.text("Wind Speed=" + speed+" MPH");
            uv.text("UV Index=" + Uv)
            tempature.prepend("Tempature ="+parseInt(faren) + "&deg;" + "F");
          
            


        })
    })
}


// 5 day weather forecast
$("#search_bt").on("click", function (event) {
    event.preventDefault();
    var input = $("#look").val();
    $("#history").attr("style", "display:content");
    var jUrl= "https://api.openweathermap.org/data/2.5/forecast?q="+input+"&units=imperial"+"&appid="+key;
    $.ajax({
        url:jUrl,
        method:"GET",
    }).then(function(info){
        console.log(info)
        var list = (info.list);

        // console.log(list[0].dt_txt);
        // console.log(list[0].main.temp);
        // console.log(list[0].main.humidity);
        //var day =[day1,day2,day3,day4,day5];
        var counter = 0;
        // while(counter < day.length){
         for(var i =0; i < list.length; i+=9){
             for(var b= i; b > list.length -1; b-=1){
                console.log(list[i])
                day1.find($("#date_1")).text(list[b].dt_txt);
            //  day2.find($("#date_2")).text(list[9].dt_txt);
            //  day3.find($("#date_3")).text(list[10].dt_txt);
            //  day4.find($("#date_4")).text(list[36].dt_txt);
            //  day3.find($("#date_3")).text(list[37].dt_txt);
             
            // day[counter].find($("#temp")).text(list[i].main.temp);
            // day[counter].find($("#humidity")).text(list[i].main.humidity);
             }
            }
        //     
        //    counter++
        
        
     })
})

