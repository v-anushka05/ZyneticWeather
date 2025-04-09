import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecastData.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p>{Math.round(item.main.temp)}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;