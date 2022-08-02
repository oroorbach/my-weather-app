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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thur", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class = "row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `      
          <div class="col-2">
            <i class="fa-regular fa-sun icon-sun"></i> <br />
            <div class="forecast-day">${day}</div>

            <span class="temperature-max">55°</span>
            <span class="temperature-min"> |°</span>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "c862a60ffa7620d74753b0a466bf96fa";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
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
