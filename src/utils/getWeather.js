const { json } = require("express");
const request = require("request"),chalk=require('chalk')

const cl = (d) => {
  console.log(chalk.green.inverse(d));
};

const filteredData = async (weatherData, enteredCity) => {
  if (!enteredCity || enteredCity == "none") {
    return {
      city: enteredCity,
      error: "Please send query parameters with URL",
    };
  }
  if (weatherData.cod == 200) {
    return {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      description: `${weatherData.weather[0].main}. ${weatherData.weather[0].description}`
    };
  } else if (weatherData.cod == 404 || weatherData.cod == 400) {
    return {
      city: enteredCity,
      error:
        "Please check your entered city or state spelling or Is available in India",
    };
  } else {
    return {
      city: weatherData.name,
      error: "Contact US",
    };
  }
};

const getWeather = async (city, callBack) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73642407cd5bdc62b6ea839f6cfd7ee4&units=metric`;
  let weatherData = { city: "Initial City", error: "Unknown" };

  request.get({ url, json: true }, async (err, {body}={}) => {
    if (err) {
      cl(`Error occured for : ${city}`);
      weatherData = { city: city, error: err };
      callBack(weatherData);
    } else {
      cl(`Request data received for : ${city}`);
      weatherData = await filteredData(await body, city);
      return callBack(weatherData || { error: "Unknown issue" });
    }
  });
};

module.exports = getWeather;
