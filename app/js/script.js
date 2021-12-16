const getWeather = async (city) => {
  const key = "272a18b6b4371fbd37cfb19dfe8d2576";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  );

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

const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};

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

  const location = document.createElement("h2");
  location.className = "location";
  location.textContent = `${weather.cityName}, ${weather.country}`;
  const weatherLongDescription = document.createElement("h4");
  weatherLongDescription.className = "long-weather-description";
  weatherLongDescription.textContent = capitalizeWords(weather.weatherLongDescription);
  const temperature = document.createElement("h2");
  temperature.className = "temperature";
  temperature.textContent = `${Math.round(weather.temperature)}°`;
  const maxTemperature = document.createElement("h5");
  maxTemperature.className = "max-temperature";
  maxTemperature.textContent = `H:${Math.round(weather.maxTemperature)}°`;
  const minTemperature = document.createElement("h5");
  minTemperature.className = "min-temperature";
  minTemperature.textContent = `L:${Math.round(weather.minTemperature)}°`;
  const feelsLikeContainer = document.createElement("div");
  feelsLikeContainer.className = "feels-like-container";
  const feelsLikeIcon = document.createElement("img");
  feelsLikeIcon.src = "https://cdn-icons-png.flaticon.com/512/861/861429.png";
  const feelsLikeText = document.createElement("div");
  const feelsLikeLabel = document.createElement("label");
  feelsLikeLabel.textContent = "Feels Like";
  const feelsLike = document.createElement("h5");
  feelsLike.className = "feels-like";
  feelsLike.textContent = `${Math.round(weather.feelsLike)}°`;
  const humidityContainer = document.createElement("div");
  humidityContainer.className = "humidity-container";
  const humidityIcon = document.createElement("img");
  humidityIcon.src = "https://cdn-icons-png.flaticon.com/512/481/481453.png";
  const humidityText = document.createElement("div");
  const humidityLabel = document.createElement("label");
  humidityLabel.textContent = "Humidity";
  const humidity = document.createElement("h5");
  humidity.className = "humidity";
  humidity.textContent = `${weather.humidity}%`;
  const windSpeedContainer = document.createElement("div");
  windSpeedContainer.className = "wind-speed-container";
  const windSpeedIcon = document.createElement("img");
  windSpeedIcon.src = "https://cdn-icons-png.flaticon.com/512/5532/5532947.png";
  const windSpeedText = document.createElement("div");
  const windSpeedLabel = document.createElement("label");
  windSpeedLabel.textContent = "Wind Speed";
  const windSpeed = document.createElement("h5");
  windSpeed.className = "wind-speed";
  windSpeed.textContent = `${weather.windSpeed} m/sec`;
  const pressureContainer = document.createElement("div");
  pressureContainer.className = "pressure-container";
  const pressureIcon = document.createElement("img");
  pressureIcon.src = "https://cdn-icons-png.flaticon.com/512/1582/1582887.png";
  const pressureText = document.createElement("div");
  const pressureLabel = document.createElement("label");
  pressureLabel.textContent = "Pressure";
  const pressure = document.createElement("h5");
  pressure.className = "pressure";
  pressure.textContent = `${weather.pressure} hPa`;

  maxMinTemperatures.appendChild(maxTemperature);
  maxMinTemperatures.appendChild(minTemperature);
  feelsLikeText.appendChild(feelsLikeLabel);
  feelsLikeText.appendChild(feelsLike);
  feelsLikeContainer.appendChild(feelsLikeIcon);
  feelsLikeContainer.appendChild(feelsLikeText);
  humidityText.appendChild(humidityLabel);
  humidityText.appendChild(humidity);
  humidityContainer.appendChild(humidityIcon);
  humidityContainer.appendChild(humidityText);
  windSpeedText.appendChild(windSpeedLabel);
  windSpeedText.appendChild(windSpeed);
  windSpeedContainer.appendChild(windSpeedIcon);
  windSpeedContainer.appendChild(windSpeedText);
  pressureText.appendChild(pressureLabel);
  pressureText.appendChild(pressure);
  pressureContainer.appendChild(pressureIcon);
  pressureContainer.appendChild(pressureText);
  primaryWeatherData.appendChild(location);
  primaryWeatherData.appendChild(weatherLongDescription);
  primaryWeatherData.appendChild(temperature);
  primaryWeatherData.appendChild(maxMinTemperatures);
  secondaryWeatherData.appendChild(feelsLikeContainer);
  secondaryWeatherData.appendChild(humidityContainer);
  secondaryWeatherData.appendChild(windSpeedContainer);
  secondaryWeatherData.appendChild(pressureContainer);
  main.appendChild(primaryWeatherData);
  main.appendChild(secondaryWeatherData);
};

window.onload = getWeather("London");
