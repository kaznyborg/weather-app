var APE_KEY = ''
function getGeoLocation(query) {
    return fetch('http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit5}&appid=${API key}')
}

function getCurrentWeather(lat, lan) {
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}')
}

getGeoLocation('Upland')
.then(Response => Response.json())
.then(data => {
    var lat = data[0]
    var lon = data[0]
    getCurrentWeather({lat,lon})
    .then(watherResponse => weatherResponse.json())
    .then(weatherData => {
        document.body.textContent = JSON.stringify(data, null, 2) 
    })
    .catch(error => {
        document.body.textContent = error.message 
})
.catch(error => {
    document.body.textContent = error.message
}) 