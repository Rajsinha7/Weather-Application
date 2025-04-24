const apiKey = '81011220b120442aa6685822252004';
const locationInput = document.getElementById('location');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
    const location = locationInput.value.trim();
    if (location !== '') {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Location not found');
                }
            })
            .then(data => displayWeather(data))
            .catch(error => displayError(error.message));
    } else {
        displayError('Please enter a location');
    }
}

function displayWeather(data) {
    errorMessage.innerHTML = '';
    const weatherHtml = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Feels like: ${data.current.feelslike_c}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Weather: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather icon">
    `;
    weatherInfo.innerHTML = weatherHtml;
}

function displayError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.innerHTML = message;
}