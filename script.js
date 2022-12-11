let city = "";

/*
let searchCity = $("#seach-city");
let searchButton = $("#search-button");
let currentCity = $("#current-city");
let currentTemperature =$("#temperature");
let currentHumidty = $("#humidity");
let currentWSpeed = $("#wind-speed");
let sCity = [];
*/
var apiKey = "44ac66359ebc06ee5f56d4c8d0ddc084"

var cityName =document.getElementById("city-name")

var search = document.getElementById("search")

function createWeather(cityName) {
   var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
   fetch(url)
   .then(function(response){
    if (!response.ok){
        throw response.json();
    }
    return response.json();
   })
   .then(function(weatherdata){
    console.log(weatherdata);

    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(forecastUrl)
    .then(function(response){
        if (!response.ok){
            throw response.json();
        }
        return response.json();
    })
    .then(function(forecastData){
        console.log(forecastData);
    })
   })
}

search.addEventListener("click" , function(){
    createWeather(cityName.value)
})