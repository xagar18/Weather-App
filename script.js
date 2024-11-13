document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherbtn = document.getElementById("getweaterbtn");
  const weatherInfo = document.getElementById("weather-info");
  const cityDisp = document.getElementById("city-name");
  const tempDisp = document.getElementById("temp");
  const discDisp = document.getElementById("discrip");
  const errorMessage = document.getElementById("errormessage");
  const API_KEY = "1d494b5f2991b70c0741b7729de16417";

  getWeatherbtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("Response", response);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;

    cityDisp.textContent = name;
    tempDisp.textContent = `Temperature : ${main.temp}`;
    discDisp.textContent = `Weather : ${weather[0].description}`;

    //unlock display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
