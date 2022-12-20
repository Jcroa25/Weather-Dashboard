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

function getCityParams() {
    var searchParamsArr = document.location.search.split('&');
    var cityParam = searchParamsArr[0].split('=').pop();
    console.log(searchParamsArr);
    var locQueryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityParam + ',US' + '&appid=' + apiKey;
    console.log(locQueryUrl);
    if(!cityParam) {
        console.log('Please enter a city');
        return;
    }
    fetch(locQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            var cityName = data[0].name;
            cityNameEl.textContent = cityName;
            currentWeather(cityLat, cityLon);
        })
        
        
}


function searchSubmit(event) {
    event.preventDefault();

    if (!cityInput.value) {
        console.error('You need a search input value!');
        return;
    }
    var queryString = './index.html?q=' + cityInput.value + '&apikey=' + apiKey;
    location.assign(queryString);
    console.log(queryString);
}

function renderSearches() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if(!cities) {
        console.log('no saved inputs yet')
    } else {
        for (i = 0; i < cities.length; i++) {
            var cities = cities[i];
            var buttonEl = document.createElement('button');
            buttonEl.classList.add('btnEl', 'btn', 'btn-info', 'm-2' );
            buttonEl.innerHTML = city;
            searchContainer.append(buttonEl);
            prevSearchSubmit(buttonEl)
        }
    }
}

function prevSearchSubmit(buttonEl) {
    buttonEl.addEventListener('click', function (event) {
        event.preventDefault();
        prevQueryString = './index.html?q=' + buttonEl.innerHTML + '&apikey=' + apiKey;
        location.assign(prevQueryString);
        console.log(prevQueryString);

    })
}

citySearchBtn.addEventListener('click', searchSubmit);
citySearchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    var cityText = cityInput.value;
    if (cityText === "") {
        return;
    }
    cities.push(cityText);
    cityInput.value = "";
    localStorage.setItem('cities', JSON.stringify(cities));
})

getCityParams();
renderSearches();
