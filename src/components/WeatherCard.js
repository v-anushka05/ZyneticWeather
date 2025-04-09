import React from "react";

const WeatherCard = ({ weatherData }) => {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{weatherData.name}</h2>
      <h3>{Math.round(weatherData.main.temp)}°C</h3>
      <img src={weatherIconUrl} alt={weatherData.weather[0].description} className="weather-icon" />
      <p>{weatherData.weather[0].description}</p>
      <div className="weather-details">
        <p>Feels Like: {Math.round(weatherData.main.feels_like)}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Longitude: {weatherData.coord.lon}</p>
        <p>Latitude: {weatherData.coord.lat}</p>
      </div>
      <p className="footer-text">DONE BY ANUSHKA</p>
    </div>
  );
};

export default WeatherCard;