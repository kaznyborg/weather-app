var input = document.querySelector('#input')

// Listen for the "Enter" key to be pressed, then search
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    createWeatherDisplay(event.target.value)
  }
})

// Get the previous search history from local storage
var previousSearchHistory = localStorage.getItem('history')
// If ther is a previous search history, parse it
if (previousSearchHistory) {
  previousSearchHistory = JSON.parse(previousSearchHistory)
} else {
  // If there is no previous search history, set it to an empty array
  previousSearchHistory = []
}

// Loop through the previous search history
for (var i = 0; i < previousSearchHistory.length; i++) {
  // Create a button for each item in the previous search history
  var historyBtn = document.createElement('button')
  var historyItem = previousSearchHistory[i]
  historyBtn.textContent = historyItem
  // Add an event listener to each button, when you click it, it will search for the location
  historyBtn.addEventListener('click', function(event) {
    createWeatherDisplay(event.target.textContent)
  })

  // Add the button to the page
  document.body.appendChild(historyBtn)
}

// Create a variable to hold the API key
var API_KEY = 'a608b72ea4044e521e75dd30461413b7'

// A function that returns a promise. The promise is a fetch coordinate data based on a location
function getGeoLocation(query, limit = 5) {
  return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`)
}

// A function that returns a promise. The promise is a fetch the weather based on the coordinates
function getCurrentWeather(arguments) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
}

// A function that returns a promise. The promise is a fetch to api geolocator
function getLocation(callback) {
  console.log('this work?')
  if (navigator.geolocation) {
    console.log('this did work?')
    navigator.geolocation.getCurrentPosition(
      callback,
      (error) => console.log(error)
    );
  } else {
    console.log('Nope!')
  }
}

// A function that adds a location to the search history
function addToHistory(location) {
  // Get the previous search history from local storage
  var searchHistory = localStorage.getItem('history')
  // If ther is a previous search history, parse it
  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory)
    
    // If the location is already in the search history, don't add it again
    if (searchHistory.includes(location)) {
      return
    }

    // Add the location to the search history
    searchHistory.push(location)
    // Save the search history to local storage
    localStorage.setItem('history', JSON.stringify(searchHistory))
  } else {
    // If there is no previous search history, set it to an empty array
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
  currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather[0].description}`
  document.body.appendChild(weatherPicture)
  document.body.appendChild(currentWeatherStatement)
  addToHistory(location)
}


// A function that gets the current location from the first API
// Then it gets the weather data from the second API
// Then it displays the weather data
function createWeatherDisplay(location) {
  return getGeoLocation(location)
  .then(function(response) {
    return response.json()
  })
  .then(data => {
    console.log(data)
    if (data.length === 0) {
      var erroEl = document.createElement('p')
      erroEl.textContent = `We couldn't find ${location}`
      document.body.appendChild(erroEl)
    } else {
      getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
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