// Weather functionality
async function getWeather(lat, lon) {
    try {
        const response = await fetch(
            `${config.weatherApiBaseUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.weatherApiKey}&units=metric`
        );
        const data = await response.json();
        updateWeatherWidget(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-widget').innerHTML = 'Weather unavailable';
    }
}

function updateWeatherWidget(weatherData) {
    const weatherWidget = document.getElementById('weather-widget');
    const currentWeather = document.getElementById('current-weather');
    const temperature = document.getElementById('temperature');

    currentWeather.textContent = weatherData.weather[0].description;
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
}