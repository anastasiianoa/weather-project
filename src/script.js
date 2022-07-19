


function showCelsiusTemp(event) {
  event.preventDefault();
  let headingNumber = document.querySelector("#number");
  headingNumber.innerHTML = 26;
}
let celsiusTemp = document.querySelector("#celsius-option");
celsiusTemp.addEventListener("click", showCelsiusTemp);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let headingNumber = document.querySelector("#number");
  headingNumber.innerHTML = 79;
}
let fahrenheitTemp = document.querySelector("#fahrenheit-option");
fahrenheitTemp.addEventListener("click", showFahrenheitTemp);


function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
  seconds = `0${seconds}`;
  }
  let date = now.getDate();
  if (date < 10) {
  date = `0${date}`;
  }
  let day = now.getDay();
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
  ];
  day = days[now.getDay()];
  let month = now.getMonth();
  let months = [
  "January",
  "Fabruary",
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
  month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${hours}:${minutes}:${seconds} 
  <br /> 
  ${date} ${month} ${year}
  <br />
  ${day}`;
}

function showCityTemp(response) {
  console.log(response);
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity-percent").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("h2").innerHTML = response.data.weather[0].main;
  document.querySelector("h4").innerHTML = response.data.name;
  document.querySelector("#date-div").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "e857302a97b40109349553dc17222164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e857302a97b40109349553dc17222164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#location-button");
button.addEventListener("click", showCurrentLocationWeather);

