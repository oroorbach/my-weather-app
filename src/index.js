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

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  document.querySelector("h2").innerHTML = city;
  let apiKey = "c862a60ffa7620d74753b0a466bf96fa";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  axios
    .get(`${apiUrl}q=${city}&APPID=${apiKey}&units=imperial`)
    .then(displayWeather);
}

document.querySelector("#city-info").addEventListener("submit", inputCity);

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

function displayWeather(response) {
  document.querySelector(".actualDeg").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weatherDes").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("h2").innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = currentTime(response.data.dt * 1000);
}
document.querySelector("#current-btn").addEventListener("click", getLocation);
