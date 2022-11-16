
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
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&units=${'imperial'}&appid=${API_KEY}`)
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

function displayWeatherData(weatherData) {
    console.log(weatherData)
    var weatherPicture = document.createElement('img')
    weatherPicture.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    var currentWeatherStatement = document.createElement('p')
            currentWeatherStatement.textContent = `${weatherData.weather[0].main}: it is currently ${weatherData.weather[0].discription}` 
                // `${weatherData.current[0].temp}: the temprature is ${weatherData.current[0].temp}`,
                // `${weatherData.current[0].humidity}: the humidity is ${weatherData.current[0].humidity}`,
                // `${weatherData.current[0].wind_speed}: the wind is blowing ${weatherData.current[0].wind_speed}`
            document.body.appendChild(weatherPicture)
            document.body.appendChild(currentWeatherStatement)
            //document.body.textContent = JSON.stringify(weatherData, null, 2) 
            addToHistory(location)        
}

function createWeatherDisplay(location) {
   return getGeoLocation(location)
    .then(function(Response) {
        return Response.json()
    })
    .then(data => {
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
