const getWeather = async (city) => {
  const key = "272a18b6b4371fbd37cfb19dfe8d2576";

  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);

  const weatherData = await response.json();

  const weather = {
    temperature: weatherData.main.temp,
    maxTemperature: weatherData.main.temp_max,
    minTemperature: weatherData.main.temp_min,
    feelsLike: weatherData.main.feels_like,
    humidity: weatherData.main.humidity,
    pressure: weatherData.main.pressure,
    windSpeed: weatherData.wind.speed,
    cityName: weatherData.name,
    country: weatherData.sys.country,
    weatherShortDescription: weatherData.weather[0].main,
    weatherLongDescription: weatherData.weather[0].description,
  };

  displayWeather(weather);
};

const getUserInput = (() => {
  const userInput = document.querySelector("#city");
  const submitButton = document.querySelector("#submit");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    getWeather(userInput.value);
    userInput.value = "";
  });
})();

const displayWeather = (obj) => {
  const main = document.querySelector("main");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  const weather = obj;

  const primaryWeatherData = document.createElement("div");
  primaryWeatherData.className = "primary-weather-data";
  const secondaryWeatherData = document.createElement("div");
  secondaryWeatherData.className = "secondary-weather-data";
  const maxMinTemperatures = document.createElement("div");
  maxMinTemperatures.className = "max-min-temperatures";

  const location = document.createElement("div");
  location.className = "location";
  location.textContent = `${weather.cityName}, ${weather.country}`;
  const temperature = document.createElement("div");
  temperature.className = "temperature";
  temperature.textContent = weather.temperature;
  const weatherLongDescription = document.createElement("div");
  weatherLongDescription.className = "long-weather-description";
  weatherLongDescription.textContent = weather.weatherLongDescription;
  const maxTemperature = document.createElement("div");
  maxTemperature.className = "max-temperature";
  maxTemperature.textContent = weather.maxTemperature;
  const minTemperature = document.createElement("div");
  minTemperature.className = "min-temperature";
  minTemperature.textContent = weather.minTemperature;
  const feelsLike = document.createElement("div");
  feelsLike.className = "feels-like";
  feelsLike.textContent = weather.feelsLike;
  const humidity = document.createElement("div");
  humidity.className = "humidity";
  humidity.textContent = `${weather.humidity}%`;
  const pressure = document.createElement("div");
  pressure.className = "pressure";
  pressure.textContent = weather.pressure;
  const windSpeed = document.createElement("div");
  windSpeed.className = "wind-speed";
  windSpeed.textContent = weather.windSpeed;

  maxMinTemperatures.appendChild(maxTemperature);
  maxMinTemperatures.appendChild(minTemperature);
  primaryWeatherData.appendChild(location);
  primaryWeatherData.appendChild(temperature);
  primaryWeatherData.appendChild(weatherLongDescription);
  primaryWeatherData.appendChild(maxMinTemperatures);
  secondaryWeatherData.appendChild(feelsLike);
  secondaryWeatherData.appendChild(humidity);
  secondaryWeatherData.appendChild(pressure);
  secondaryWeatherData.appendChild(windSpeed);
  main.appendChild(primaryWeatherData);
  main.appendChild(secondaryWeatherData);
};
