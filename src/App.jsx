import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import { motion, AnimatePresence } from "framer-motion"; // Enhanced with AnimatePresence
import "./App.css";

const App = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [background, setBackground] = useState("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"); // Default dark theme background

  const weatherApiKey = "06a04d9169f2d76b388aacafe09838bd"; // Replace with your OpenWeather API key

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${weatherApiKey}`;
      const response = await axios.get(weatherUrl);
      setWeatherData(response.data);
      fetchForecast(city, country);
      updateRecentSearches(city);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Invalid city name. Please try again.");
      } else {
        setError("Failed to fetch weather data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city, country) => {
    try {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${weatherApiKey}`;
      const response = await axios.get(forecastUrl);
      setForecastData(response.data.list.slice(0, 5)); // Get first 5 entries for 5-day overview
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const updateRecentSearches = (city) => {
    setRecentSearches((prev) => {
      const newSearches = [city, ...prev.filter((c) => c !== city)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const refreshWeather = () => {
    if (weatherData) fetchWeather();
  };

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
    // Update background based on theme
    setBackground(
      theme === "dark"
        ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        : "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className={`app ${theme}`} style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <header className={`header ${theme}`}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchWeather} className="go-button">
          Go
        </button>
        <button onClick={refreshWeather} className="refresh-button">
          Refresh
        </button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </header>

      <div className="content">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              className="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </motion.div>
          ) : error ? (
            <motion.p
              key="error"
              className="error-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          ) : weatherData ? (
            <motion.div
              key="weather"
              className="weather-container"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <WeatherCard weatherData={weatherData} />
              <FiveDayForecast forecastData={forecastData} />
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              className="placeholder-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Enter a country and city to get the weather.
            </motion.p>
          )}
        </AnimatePresence>

        {recentSearches.length > 0 && (
          <motion.div
            className={`recent-searches ${theme}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h3>Recent Searches</h3>
            <ul>
              <AnimatePresence>
                {recentSearches.map((search, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setCity(search)}
                    style={{ cursor: "pointer" }}
                  >
                    {search}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;