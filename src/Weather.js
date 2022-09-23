import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "7179076ef4f2fb19a2b95f61ff693b85";
    let units = "metric";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiurl).then(showTemperature);
  }

  function showTemperature(response) {
    setWeather({
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (weather) {
    return (
      <div className="container">
        <h1> REACT Weather Search Engine </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a city..."
            onChange={updateCity}
          />
          <input type="submit" value="Submit" />
          <br />
          <br />
        </form>
        <h2>
          The weather in {weather.city} is {weather.temperature}°C.{" "}
        </h2>
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} km/h</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={"weather icon"}
            ></img>
          </li>
        </ul>

        <footer> <em>
    This project was coded by <a href="https://www.margaretcezar.com" target="_blank">Margaret Cezar</a> and is open sourced on <a href="https://github.com/Margaret6556/VanillaWeatherApp/branches" target="_blank">Github repository</a> and hosted on <a href="https://vermillion-macaron-178e6c.netlify.app/" target="_blank">Netlify</a>
    </em></footer>
      </div>
    );
  } else {
    let apiKey = "7179076ef4f2fb19a2b95f61ff693b85";
    let units = "metric";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=${units}`;
    axios.get(apiurl).then(showTemperature);

    return <h4> Loading... for {props.city} </h4>;
  }
}
