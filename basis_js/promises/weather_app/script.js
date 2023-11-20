/*
input box via geolocation endpoint + send button

met geolocation lat & lon ophalen

daarmee het weerbericht ophalen (huidig + evt. forecast)

daarmee eigen ding doen, maar minstens 3 weergerelateerde zaken weergeven

1. huidig weer
2. 3hour 5day forecast
3. weather map
*/

/*WEER OPHALEN
https://api.openweathermap.org/data/2.5/weather?appid=33dcc2f20d92c833f0a2b35480e37b1f&lat=51&lon=3
*/

/*GEOCODING
http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=33dcc2f20d92c833f0a2b35480e37b1f&q=Gent
*/

const BASE_URL_GEOLOC =
  "http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=33dcc2f20d92c833f0a2b35480e37b1f&q=";

const BASE_URL_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=33dcc2f20d92c833f0a2b35480e37b1f";

function showWeather() {
  locationToCoordinates()
    .then((coor) => Promise.all([getCurrentWeather(coor), getForecast(coor)]))
    .then(printWeather);
}

function locationToCoordinates() {
  const locationField = document.querySelector("#locationField");
  const location = locationField.value;
  return fetch(`${BASE_URL_GEOLOC}${location}`)
    .then((res) => res.json())
    .then((res) => {
      return { lat: res[0].lat, lon: res[0].lon };
    });
}

function getCurrentWeather({ lat, lon }) {
  return fetch(`${BASE_URL_WEATHER}&lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((res) => {
      return {
        main: res.main,
        weather: res.weather[0],
        wind: res.wind,
      };
    });
}

function getForecast({ lat, lon }) {
  return fetch(`${BASE_URL_WEATHER}&lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((res) => {
      return {
        main: res.main,
        weather: res.weather[0],
        wind: res.wind,
      };
    });
}

function printWeather(res) {
  console.log(res);
  const body = document.querySelector("body");
  const weatherField = document.createElement("div");
  body.appendChild(weatherField);
  const rainField = document.createElement("li");
  rainField.classList.add("rain");
  weatherField.appendChild(rainField);
  const tempField = document.createElement("li");
  tempField.classList.add("temp");
  weatherField.appendChild(tempField);
  const windField = document.createElement("li");
  windField.classList.add("wind");
  weatherField.appendChild(windField);
  rainField.innerText = `Weather today: ${res[0].weather.description}`;
  tempField.innerText = `Temperature: ${res[0].main.temp - 272.15} °C`;
  windField.innerText = `Wind: ${res[0].wind.speed} speed, ${res[0].wind.gust} gust`;
}
