//URL webs

//pointers for search
var key="&appid=f315bcdf1cb4baa6f540676f13336a8c"
var history = $("#history");
var city = $("#current").find($("#city"));
var humidity = $("#current").find($("#humidity"));
var speedW = $("#current").find($("#speed"));
var uv = $("#current").find($("#uv"));
var day1 = $(".day").find($("day_1"));
var day2 = $(".day").find($("day_2"));
var day3 = $(".day").find($("day_3"));
var day4 = $(".day").find($("day_4"));
var day5 = $(".day").find($("day_5"));




//Will return search history
$(document).ready(function () {
    Today()

});

//hides items from the user until they're called upon.
$("#results").attr("style", "display:none");
$("#history").attr("style", "display:none");

//getting the uv index function 
function index(lat,lon,cnt){
    var jurl= "http://api.openweathermap.org/data/2.5/uvi/forecast?appid="+key+"&lat="+lat+"&lon="+lon+"&cnt="+cnt;
    $.ajax({
        url:jurl,
        method:"GET"
    }).then(function(info){
        return info.value
    })


}




//current conditions function 
function Today() {
    $("#search_bt").on("click", function (event) {
        event.preventDefault();
        $("#history").attr("style", "display:content");
        var input = $("#look").val();
        var bt = $("<button>");
        bt.text(input);
        bt.addClass("list-group-item");
        bt.addClass("list-group-item-action")
        $("#history").append(bt)



        var jUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + key;
        $.ajax({
            url: jUrl,
            method: "GET"
        }).then(function (info) {
            console.log(info)
            $("#results").attr("style", "display:content");
            var name = info.name;
            var temp = info.main.temp;
            var lat = info.coord.lat;
            var lon =info.coord.lat
            var hum = info.main.humidity;;
            var speed = info.wind.speed;
            var Uv = index(lon,lat,1)
            city.text(name);
            humidity.text("Humidity = " + hum);
            speedW.text("Wind Speed=" + speed);
            uv.text("UV Index=" + Uv)



        })
    })
}


// // 5 day weather forecast
// $("#search_bt").on("click", function (event) {
//     event.preventDefault();
//     var input = $("#look").val();
//     var num = 3;
//     $("#history").attr("style", "display:content");
//     var jUrl= "https://api.openweathermap.org/data/2.5/forecast?q="+input+"&cnt=5&appid=f315bcdf1cb4baa6f540676f13336a8c";
//     $.ajax({
//         url:jUrl,
//         method:"GET",
//     }).then(function(info){
//         console.log(info)
//         // list = (info.list);
//         // var days=[day1,day2,day3,day4,day5];
//         // for(var i =0; i < list.length; i++){
//         //     console.log(list[i])
//         //     if(i===5){
//         //         break
//         //     }
//            // }
        
//     })
// })

