var input = document.querySelector('#input')

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
    var historyItem = previousSearchHistory[i]
    historyBtn.textContent = historyItem
    historyBtn.addEventListener('click', function(event) {
        createWeatherDisplay(event.target.textContent)
    })

    document.body.appendChild(historyBtn)
}

var API_KEY = 'a608b72ea4044e521e75dd30461413b7'
function getGeoLocation(query, limit = 5) {
    return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`)
}

function getCurrentWeather(arguments) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
}

function getLocation(callback) {
  console.log('this work')
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
            if (searchHistory[i] === location) {
                return
            }
        }
        searchHistory.push(location)
        localStorage.setItem('history', JSON.stringify(searchHistory))
        }else {
            searchHistory = [location]
            localStorage.setItem('history', JSON.stringify(searchHistory))
        }
}

// A function that displays the weather data
function displayWeatherData(weatherData) {
  console.log(weatherData)
  var weatherPicture = document.createElement('img')
  weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  var currentWeatherStatement = document.createElement('p')
  currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather[0].description}, 
  the temprature is ${weatherData.main.temp}F, the humidity is ${weatherData.main.humidity}%, the wind is blowing ${weatherData.wind.speed}mph`
  document.body.appendChild(weatherPicture)
  document.body.appendChild(currentWeatherStatement)
  addToHistory(location)
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
  .catch(error => {
    document.body.textContent = error.message
  })
})








