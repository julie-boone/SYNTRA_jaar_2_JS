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
  "https://api.openweathermap.org/data/2.5/weather?appid=33dcc2f20d92c833f0a2b35480e37b1f&units=metric";

const BASE_URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast?appid=33dcc2f20d92c833f0a2b35480e37b1f&units=metric";

function showWeather() {
  const currentWeatherField = document.querySelector("#currentWeatherField");
  const forecastField = document.querySelector("#forecastField");
  if (currentWeatherField) {
    currentWeatherField.remove();
    forecastField.remove();
  }
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
        name: res.name,
        main: res.main,
        weather: res.weather[0],
        wind: res.wind,
      };
    });
}

function getForecast({ lat, lon }) {
  return fetch(`${BASE_URL_FORECAST}&lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return {
        name: res.city.name,
        list: res.list,
      };
    });
}

function printWeather(res) {
  console.log(res);
  printCurrentWeather(res);
  printForecast(res);
}

function printCurrentWeather(res) {
  const body = document.querySelector("body");
  const currentWeatherField = document.createElement("div");
  currentWeatherField.setAttribute("id", "currentWeatherField");
  body.appendChild(currentWeatherField);
  const title = document.createElement("h2");
  title.innerText = "Current weather for " + res[0].name;
  currentWeatherField.appendChild(title);
  const currentWeather = document.createElement("div");
  currentWeather.classList.add("grid_col_3");
  currentWeatherField.appendChild(currentWeather);
  const currentRain = document.createElement("p");
  currentRain.classList.add("rain");
  currentWeather.appendChild(currentRain);
  const currentTemp = document.createElement("p");
  currentTemp.classList.add("temp");
  currentWeather.appendChild(currentTemp);
  const currentWind = document.createElement("p");
  currentWind.classList.add("wind");
  currentWeather.appendChild(currentWind);
  // const windDirection = document.createElement("img");
  // currentWind.appendChild(windDirection);
  currentRain.innerText = `${String(
    res[0].weather.description
  )[0].toUpperCase()}${String(res[0].weather.description).slice(1)}`;
  currentRain.insertAdjacentHTML(
    "afterbegin",
    `<img src="https://openweathermap.org/img/wn/${res[0].weather.icon}@2x.png" alt="pic" /> <br>`
  );
  currentTemp.innerText = `${Math.round(res[0].main.temp)} °C`;
  currentWind.innerText = `${(res[0].wind.speed * 3.6).toFixed(1)} km/u`;
}

function printForecast(res) {
  const body = document.querySelector("body");
  const forecastField = document.createElement("div");
  forecastField.setAttribute("id", "forecastField");
  body.appendChild(forecastField);
  const title = document.createElement("h2");
  title.innerText = "5-day forecast for " + res[1].name;
  forecastField.appendChild(title);

  tempChart(res);
}

function tempChart(res) {
  const forecastField = document.querySelector("#forecastField");
  forecastField.insertAdjacentHTML(
    "beforeend",
    `<canvas id="tempChart" style="width:100%;max-width:800px"></canvas>`
  );

  const dateTimes = Array.from(res[1].list).map((cv) => {
    return String(cv.dt_txt).slice(11, 13);
  });

  const temps = Array.from(res[1].list).map((cv) => {
    return Math.round(cv.main.temp);
  });

  const xValues = dateTimes;
  const yValues = temps;

  new Chart("tempChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: "orange",
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "5-day temperature forecast for " + res[1].name,
      },
    },
  });
}
