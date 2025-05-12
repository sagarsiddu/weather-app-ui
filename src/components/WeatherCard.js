// src/components/WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.main) return null;

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <p className="text-gray-600">Temperature: {weather.main.temp} °C</p>
      <p className="text-gray-600">Humidity: {weather.main.humidity}%</p>
      <p className="text-gray-600">Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
