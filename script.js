import { API_KEY } from './config.js';

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${url}${city}&appid=${API_KEY}`);
        if (response.status === 404) {
            showError();
            return;
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("Something went wrong. Please try again.");
    }
}

function showError(message = "City not found!") {
    document.querySelector(".error").innerHTML = message;
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

function updateWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    updateWeatherIcon(data.weather[0].main);
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function updateWeatherIcon(weather) {
    const weatherCondition = weather.toLowerCase();
    const weatherIcons = {
        clouds: "assets/clouds.png",
        clear: "assets/clear.png",
        drizzle: "assets/drizzle.png",
        mist: "assets/mist.png",
        rain: "assets/rain.png",
        snow: "assets/snow.png",
        wind: "assets/wind.png",
        haze: "assets/haze.png"
    };

    weatherIcon.src = weatherIcons[weatherCondition] || "assets/default.png";
}
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        showError("Please enter a city name.");
    }
});