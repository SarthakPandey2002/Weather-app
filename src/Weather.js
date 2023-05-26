import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b64dd8ed9d2be236ca0c4920015d782&units=metric`
        )
        .then((response) => {
          setWeatherData(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setError("Error fetching weather data. Please try again.");
        });
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
        className="w-64 py-2 px-4 border rounded mb-4"
      />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {weatherData && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="text-xl font-bold">Temperature:</span>{" "}
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="mr-4">
              <span className="text-xl font-bold">Humidity:</span>{" "}
              {weatherData.main.humidity}%
            </div>
            <div>
              <span className="text-xl font-bold">Description:</span>{" "}
              {weatherData.weather[0].description}
            </div>
          </div>
          <div className="mt-4">
            {weatherData.weather[0].main === "Clear" && (
              <WiDaySunny className="text-4xl" />
            )}
            {weatherData.weather[0].main === "Clouds" && (
              <WiCloud className="text-4xl" />
            )}
            {weatherData.weather[0].main === "Rain" && (
              <WiRain className="text-4xl" />
            )}
            {weatherData.weather[0].main === "Snow" && (
              <WiSnow className="text-4xl" />
            )}
            {weatherData.weather[0].main === "Thunderstorm" && (
              <WiThunderstorm className="text-4xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
