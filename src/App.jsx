import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const fetchWeather = async () => {
    try {
      const weatherApiKey = "06a04d9169f2d76b388aacafe09838bd"; // Replace with your OpenWeather API key
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${weatherApiKey}`;
      const response = await axios.get(weatherUrl);
      setWeatherData(response.data);
      fetchBackgroundImage(city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Please check the city name or try again later.");
    }
  };

  const fetchBackgroundImage = async (query) => {
    try {
      const unsplashApiKey = "MFqdX-vTSg6Gwoe_f-bVim6Zeu4s0DJJ2zcKaM4dxz1Y"; // Replace with your Unsplash Access Key
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashApiKey}`;
      const response = await axios.get(unsplashUrl);

      if (response.data.results.length > 0) {
        const imageUrl = response.data.results[0].urls.full;
        setBackgroundImage(imageUrl);
      } else {
        console.warn("No images found for this location.");
        setBackgroundImage(""); // Reset to default or empty background
      }
    } catch (error) {
      console.error("Error fetching background image:", error);
      alert("Unable to fetch background image. Try again later.");
    }
  };

  return (
    <div
      className="app"
      style={{
        textAlign: "center",
        fontFamily: "Arial",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <header style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#fff",
            color: "#333",
          }}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#fff",
            color: "#333",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            border: "none",
            background: "#007BFF",
            color: "white",
            cursor: "pointer",
          }}
        >
          Go
        </button>
      </header>

      {weatherData ? (
        <div
          className="weather-info"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          <h2>{weatherData.name}</h2>
          <h3>{Math.round(weatherData.main.temp)}°C</h3>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>{weatherData.weather[0].description}</p>
          <div className="weather-details">
            <p>Feels Like: {Math.round(weatherData.main.feels_like)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Longitude: {weatherData.coord.lon}</p>
            <p>Latitude: {weatherData.coord.lat}</p>
          </div>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Enter a country and city to get the weather.</p>
      )}
    </div>
  );
};

export default App;
