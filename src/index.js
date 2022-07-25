function formatTime(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let localDay = days[currentDate.getDay()];
  let localHr = currentDate.getHours();
  let localMin = ("0" + currentDate.getMinutes()).slice(-2);
  let localMonth = months[currentDate.getMonth()];
  let localDate = currentDate.getDate();
  let localYear = currentDate.getFullYear();

  let formattedTime = `${localDay} ${localHr}:${localMin}`;
  let formattedDate = `${localMonth} ${localDate}, ${localYear}`;
  let time = document.querySelector("#localTime");
  let daymonthyear = document.querySelector("#currentDate");
  time.innerHTML = formattedTime;
  daymonthyear.innerHTML = formattedDate;
}
let currentDate = new Date();
formatTime(currentDate);

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
}

document.querySelector("#current-btn").addEventListener("click", getLocation);
