import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setForecast([]);

    try {
      const response = await fetch(`http://localhost:8080/api/weather/${city}`);
      if (!response.ok) throw new Error("Failed to fetch weather forecast");
      const data = await response.json();
      setForecast(data.list.slice(0, 5)); // Take first 5 entries (3-hour intervals)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ 5-Slot Weather Forecast</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Forecast</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="forecast-list">
        {forecast.map((item, index) => (
          <div className="forecast-card" key={index}>
            <p><strong>{new Date(item.dt_txt).toLocaleString()}</strong></p>
            <p>Temp: {item.main.temp}°C</p>
            <p>Weather: {item.weather[0].description}</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Wind: {item.wind.speed} m/s</p>
            <p>Clouds: {item.clouds.all}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
