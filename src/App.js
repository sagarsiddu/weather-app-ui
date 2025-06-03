import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8084/api/weather/user", {
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchWeather = async () => {
    setError("");
    setForecast([]);

    try {
      const response = await fetch(`http://localhost:8084/api/weather/${city}`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch weather forecast");
      const data = await response.json();
      setForecast(data.list.slice(0, 5));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="app">Checking authentication...</div>;

  if (!isAuthenticated) {
    return (
      <div className="app">
        <h1>Login to Use the Weather App</h1>
        <Login />
      </div>
    );
  }

  return (
    <div className="app">
      <h1>🌤️ 5-Slot Weather Forecast</h1>
      <p>Welcome, {user?.name || "User"}!</p>

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