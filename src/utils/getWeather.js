const request = require("request");

const cl = (d) => {
  console.log(d);
};

const filteredData=async (weatherData, enteredCity)=>{
    if(!enteredCity || enteredCity=='none'){
        return {
            city: enteredCity,
            error: 'Please send query parameters with URL'
        }
    }
    if(weatherData.cod==200){
        return {
            city: weatherData.name,
            temperature: weatherData.main.temp
        }
    }else if(weatherData.cod==404 || weatherData.cod==400){
        return {
            city: enteredCity,
            error: 'Please check your entered city or state spelling or Is available in India'
        }
    }else{
        return {
            city: weatherData.name,
            error: 'Contact US'
        }
    }
}

const getWeather = async (city, callBack) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73642407cd5bdc62b6ea839f6cfd7ee4&units=metric`;
  let weatherData = { city: "Initial City", error: "Unknown" };

  request.get({ url, json: true }, async(err, res) => {
    if (err) {
      cl("if err");
      weatherData = { city: city, error: err };
      callBack(weatherData)
    } else {
      cl("else err");
      weatherData=await filteredData(await res.body, city)
      return callBack(weatherData || {error: 'Unknown issue'});
    }
  });
};

module.exports = getWeather;
