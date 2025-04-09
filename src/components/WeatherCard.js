import React from 'react';

function WeatherCard({ weather }) {
  const { name, main, weather: weatherInfo, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;

  return (
    <div className="flex">
      <div id="weatherCountry">{name}</div>
      <div id="tempIcon">
        <img src={iconUrl} alt={weatherInfo[0].description} />
      </div>
      <div id="temperature">
        Temperature: <b>{main.temp}°C</b>
      </div>
      <div id="weatherDescription">{weatherInfo[0].description}</div>
      <ul>
        <li>Humidity: {main.humidity}%</li>
        <li>Wind Speed: {wind.speed} km/h</li>
      </ul>
    </div>
  );
}

export default WeatherCard;
