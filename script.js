
const apiKey = "633387738b2443759b8161841250612"; // Updated API Key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, country } = data.location;
    const { temp_c, condition, humidity, wind_kph } = data.current;
    weatherResult.innerHTML = `
        <img src="${condition.icon}" alt="${condition.text}">
        <h2>${name}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp_c}°C</p>
        <p><strong>Condition:</strong> ${condition.text}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind:</strong> ${wind_kph} kph</p>
    `;
}