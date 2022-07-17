let now = new Date();
let dateDisplay = document.querySelector("#date-div");
let time = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let date = now.getDate();
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
dateDisplay.innerHTML = `${time}:${minutes}:${seconds} 
<br /> 
${date} ${month} ${year}
<br />
${day}`;

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

function showCityTemp(response) {
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
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "e857302a97b40109349553dc17222164";
  let units = "metric";
  let cityInput = document.querySelector("#search-input");
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

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

let button = document.querySelector("#location-button");
button.addEventListener("click", showCurrentLocationWeather);
