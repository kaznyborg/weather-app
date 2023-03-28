var input = document.querySelector('#input')

var currentWeather = document.querySelector('.currentWeather')
var forecastWeather = document.querySelector('.forecastWeather')
var searchBar = document.querySelector(`.searchBar`)


input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        createWeatherDisplay(event.target.value)
    }
})

var previousSearchHistory = localStorage.getItem('history')
if (previousSearchHistory) {
    previousSearchHistory = JSON.parse(previousSearchHistory)
} else {
    previousSearchHistory = []
}

for (var i = 0; i < previousSearchHistory.length; i++) {
    var historyBtn = document.createElement('button')
    historyBtn.setAttribute('id', 'history')
    var historyItem = previousSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener('click', function(event) {
        createWeatherDisplay(event.target.textContent)
    })

    searchBar.appendChild(historyBtn)
}

var API_KEY = 'a608b72ea4044e521e75dd30461413b7'
function getGeoLocation(query, limit = 5) {
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`)
}

function getCurrentWeather(arguments) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
}

function getForecastWeather(arguments) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
}

function getLocation(callback) {
  if (navigator.geolocation) {
    console.log('this did work')
    navigator.geolocation.getCurrentPosition(
      callback, (error) => console.log(error)
    );
  } else {
    console.log('error')
  }
}

function addToHistory(location) {
    var searchHistory = localStorage.getItem('history')
    if (searchHistory) {
        searchHistory = JSON.parse(searchHistory)
        for (var i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i] === location)
                return
            }

            searchHistory.push(location)
            localStorage.setItem('history', JSON.stringify(searchHistory))
        }else {
            searchHistory = [location]
            localStorage.setItem('history', JSON.stringify(searchHistory))
        }
}

// A function that displays the weather data
  //display current weather
function displayWeatherData(weatherData) {
  console.log(weatherData)
  var weatherPicture = document.createElement('img')
  weatherPicture.setAttribute("class", "currentImg");
  weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  var city = document.createElement('p')
  city.setAttribute("class", "currentCity");
  city.textContent = `${weatherData.name}`
  var currentWeatherStatement = document.createElement('p')
  currentWeatherStatement.setAttribute("class", "currentWeatherStatement")
  currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather[0].description}, 
  the temprature is ${weatherData.main.temp}F, the humidity is ${weatherData.main.humidity}%, the wind is blowing ${weatherData.wind.speed}mph`

  currentWeather.appendChild(weatherPicture)
  currentWeather.appendChild(city)
  currentWeather.appendChild(currentWeatherStatement)
  addToHistory(weatherData.name)
}

//display forcast
function displayForecastData(forecastData){
   console.log(forecastData)

   var forecastCity = document.createElement('div')
   forecastCity.setAttribute("class", "forecastCity")
   forecastCity.textContent = `${forecastData.city.name} 5 Day Forecast`
   forecastWeather.appendChild(forecastCity)

   function day1(){
      var day1 = document.createElement('day1')
      day1.setAttribute("class", "col-xs-2 col-half-offset day")
      var forecastPicture = document.createElement(`img`)
      forecastPicture.setAttribute("class", "forecastImg")
      forecastPicture.src = `http://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon}@2x.png`
      var forecastStatement = document.createElement('p')
      forecastStatement.setAttribute("class", "forecastWeather")

      forecastStatement.textContent = `${forecastData.list[0].weather[0].main}${forecastData.list[0].weather[0].description}, 
     ${forecastData.list[0].main.temp}F ${forecastData.list[0].main.humidity}%${forecastData.list[0].wind.speed}mph`
      forecastWeather.appendChild(day1);
      day1.appendChild(forecastPicture)
      day1.appendChild(forecastStatement)
    }
    function day2(){
      var day2 = document.createElement('day2')

      day2.setAttribute("class", "col-xs-2 col-half-offset day")
      var forecastPicture = document.createElement(`img`)
      forecastPicture.setAttribute("class", "forcastImg")
      forecastPicture.src = `http://openweathermap.org/img/wn/${forecastData.list[8].weather[0].icon}@2x.png`
      var forecastStatement = document.createElement('p')
      forecastStatement.setAttribute("class", "forecastWeather")

      forecastStatement.textContent = `${forecastData.list[8].weather[0].main} ${forecastData.list[8].weather[0].description}, 
      ${forecastData.list[8].main.temp}F${forecastData.list[8].main.humidity}%${forecastData.list[8].wind.speed}mph`
      forecastWeather.appendChild(day2);
      day2.appendChild(forecastPicture)
      day2.appendChild(forecastStatement)
    }
    function day3(){
      var day3 = document.createElement('day3')
      day3.setAttribute("class", "col-xs-2 col-half-offset day")
      var forecastPicture = document.createElement(`img`)
      forecastPicture.setAttribute("class", "forcastImg")
      forecastPicture.src = `http://openweathermap.org/img/wn/${forecastData.list[16].weather[0].icon}@2x.png`
      var forecastStatement = document.createElement('p')
      forecastStatement.setAttribute("class", "forecastWeather")

      forecastStatement.textContent = `${forecastData.list[16].weather[0].main} ${forecastData.list[16].weather[0].description}, 
      ${forecastData.list[16].main.temp}F, ${forecastData.list[16].main.humidity}%${forecastData.list[16].wind.speed}mph`
      forecastWeather.appendChild(day3);
      day3.appendChild(forecastPicture)
      day3.appendChild(forecastStatement)
    }
    function day4(){
      var day4 = document.createElement('day4')
      day4.setAttribute("class", "col-xs-2 col-half-offset day")
      var forecastPicture = document.createElement(`img`)
      forecastPicture.setAttribute("class", "forcastImg")
      forecastPicture.src = `http://openweathermap.org/img/wn/${forecastData.list[24].weather[0].icon}@2x.png`
      var forecastStatement = document.createElement('p')
      forecastStatement.setAttribute("class", "forecastWeather")

      forecastStatement.textContent = `${forecastData.list[24].weather[0].main} ${forecastData.list[24].weather[0].description}, 
       ${forecastData.list[24].main.temp}F, ${forecastData.list[24].main.humidity}%, ${forecastData.list[24].wind.speed}mph`
       forecastWeather.appendChild(day4);
      day4.appendChild(forecastPicture)
      day4.appendChild(forecastStatement)
    }
    function day5(){
      var day5 = document.createElement('day5')
      day5.setAttribute("class", "col-xs-2 col-half-offset day")
      var forecastPicture = document.createElement(`img`)
      forecastPicture.setAttribute("class", "forcastImg")
      forecastPicture.src = `http://openweathermap.org/img/wn/${forecastData.list[32].weather[0].icon}@2x.png`
      var forecastStatement = document.createElement('p')
      forecastStatement.setAttribute("class", "forecastWeather")
      forecastStatement.textContent = `${forecastData.list[32].weather[0].main}${forecastData.list[32].weather[0].description}, 
      ${forecastData.list[32].main.temp}F, ${forecastData.list[32].main.humidity}%, ${forecastData.list[32].wind.speed}mph`

      forecastWeather.appendChild(day5);
      day5.appendChild(forecastPicture)
      day5.appendChild(forecastStatement)

    }
    day1();
    day2();
    day3();
    day4();
    day5();
}

function createWeatherDisplay(location) {
   return getGeoLocation(location)
    .then(function(response) {
        return response.json()
    })
    .then(data => {
      console.log(data)
        if (data.length === 0) {
            var errorEl = document.createElement('p')
            errorEl.textContent = `We couln't find ${location}`
            document.body.appendChild(errorEl)
        } else {
            getCurrentWeather({ lat: data[0].lat, lon: data[0].lon})
            .then(weatherResponse => weatherResponse.json())
            .then(weatherData => {
                displayWeatherData(weatherData)
               
        })
          getForecastWeather({ lat: data[0].lat, lon: data[0].lon})
          .then(forecastResponse => forecastResponse.json())
          .then(forecastData => {
            displayForecastData(forecastData)
          })
        .catch(error => {
            document.body.textContent = error.message 
         })
        }
    })
    .catch(error => {
    document.body.textContent = error.message
    })
}





// A function that displays a loading message
function startLoading() {
  var loading = document.createElement('p')
  loading.setAttribute('id', 'loading')
  loading.textContent = 'Loading...'
  document.body.appendChild(loading)
}

// Start the loading message
startLoading()
// Get the current location, based on the users location
var current = getLocation(function(current) {
  getCurrentWeather({ lat: current.coords.latitude, lon: current.coords.longitude })
  .then(weatherResponse => weatherResponse.json())
  .then(weatherData => {
    displayWeatherData(weatherData)
    document.querySelector('#loading').remove()
  })
  getForecastWeather({ lat: current.coords.latitude, lon: current.coords.longitude})
          .then(forecastResponse => forecastResponse.json())
          .then(forecastData => {
            displayForecastData(forecastData)
          })
  .catch(error => {
    document.body.textContent = error.message
  })
})








