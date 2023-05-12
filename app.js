/** @format */

const cityInput = document.querySelector("#cityinput");
const addBtn = document.querySelector("#add");
const cityOutput = document.querySelector("#cityoutput");
const description = document.querySelector("#description");
const temp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
// const body = document.querySelector("body");

const apikey = "3045dd712ffe6e702e3245525ac7fa38";
const unsplashApiKey = "KwnoJIhHez0kagPJyWVBLpt4V6wPYmt0cvmpx1P0umE";
const randomFactsApiKey = "t4fzSpTBNL02Vg4znCR6Pg==vXid2Rf1ZUgYyuxc";

const convertKelvinToCelsius = (val) => {
  return (val - 273).toFixed(2);
};

const displayWeatherData = (data) => {
  const cityName = data.name;
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;
  const windSpeed = data.wind.speed;

  cityOutput.innerHTML = `Weather of <span>${cityName}</span>`;
  temp.innerHTML = `Temperature: <span>${convertKelvinToCelsius(
    temperature
  )} C</span>`;
  description.innerHTML = `Sky Conditions: <span>${weatherDescription}</span>`;
  wind.innerHTML = `Wind Speed: <span>${windSpeed} km/h</span>`;
  setBackgroundImage(cityName);
  getRandomFacts(cityName);
};

const handleApiError = () => {
  Toastify({
    text: "Wrong F**ing cityyy",
    duration: 3000,
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
};

const fetchWeatherData = () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apikey}`;
  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid city name");
      }
      return res.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((err) => {
      handleApiError();
    });
};

const setBackgroundImage = (cityName) => {
  fetch(
    `https://api.unsplash.com/photos/random?query=${cityName}&orientation=landscape&client_id=${unsplashApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const displayImage = document.querySelector(".displayImage");
      const imageUrl = data.urls.regular;
      displayImage.innerHTML = `<img src=${imageUrl} alt="City's picture">`;
    })
    .catch((error) => console.error(error));
};
const getRandomFacts = (cityName) => {
  const randomFactsApi = `https://api.api-ninjas.com/v1/city?name=${cityName}`;

  fetch(randomFactsApi, {
    method: "GET",
    url: "https://api.api-ninjas.com/v1/city?name=" + cityName,
    contentType: "application/json",
    headers: { "X-Api-Key": randomFactsApiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      const fact = document.querySelector(".Facts");
      const randomFact = data[0].population;
      console.log(randomFact);
      fact.innerText = `The population of lagos is ${randomFact}`;
      if (data[0].is_capital === true) {
        console.log("capital city");
      } else {
        console.log("not a capital city");
      }
    })
    .catch((error) => console.error(error));
};
addBtn.addEventListener("click", fetchWeatherData);
