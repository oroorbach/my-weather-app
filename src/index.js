function currentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} at ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `      
          <div class="col-2">
            <img src= http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png 
            alt = ""
            width = "50"
            </img>
            <br />
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <span class="temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="temperature-min"> | <small>${Math.round(
              forecastDay.temp.min
            )}°</small></span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c862a60ffa7620d74753b0a466bf96fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  farenheitTemperature = Math.round(response.data.main.temp);
  document.querySelector("#actualDeg").innerHTML = farenheitTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weatherDes").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h2").innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon-main");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = currentTime(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  document.querySelector("h2").innerHTML = city;
  search(city);
}

function search(city) {
  let apiKey = "c862a60ffa7620d74753b0a466bf96fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "c862a60ffa7620d74753b0a466bf96fa";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  axios
    .get(
      `${apiUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${apiKey}&units=imperial`
    )
    .then(displayWeather);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#actualDeg");
  temperatureElement.innerHTML = Math.round(
    ((farenheitTemperature - 32) * 5) / 9
  );
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  document.querySelector("#actualDeg").innerHTML = farenheitTemperature;
}

document.querySelector("#current-btn").addEventListener("click", getLocation);

document.querySelector("#city-info").addEventListener("submit", inputCity);

let farenheitTemperature = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemperature);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

search("Anchorage");
