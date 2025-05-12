import React from 'react';

const WeatherResult = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-result">
      <h2>Weather in {data.name}</h2>
      <p><strong>Temperature:</strong> {data.main.temp} °C</p>
      <p><strong>Weather:</strong> {data.weather[0].description}</p>
      <p><strong>Humidity:</strong> {data.main.humidity} %</p>
      <p><strong>Wind:</strong> {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherResult;
