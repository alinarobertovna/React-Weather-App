import React from 'react';
import './tailwindstyles.css';

const FiveDayForecast = ({ forecastData, isCelsius, error }) => {
  if (error) {
    return null;
  }
  if (!forecastData || !forecastData.list) {
    return <div>Loading forecast...</div>;
  }

  const getUniqueDaysForecast = (forecastList) => {
    const uniqueDays = new Set();
    const dailyForecast = [];

    for (const entry of forecastList) {
      const date = new Date(entry.dt * 1000).toDateString();
      if (!uniqueDays.has(date)) {
        uniqueDays.add(date);
        dailyForecast.push(entry);
      }
      if (dailyForecast.length === 5) {
        break;
      }
    }
    return dailyForecast;
  };

  const dailyForecast = getUniqueDaysForecast(forecastData.list);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-grid">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <span className="forecast-date">{formatDate(new Date(day.dt * 1000))}</span>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather icon" />
            <span className="text-sm">{Math.round(day.main.temp)}°{isCelsius ? 'C' : 'F'}</span>
            <span className="text-sm">Feels like: {Math.round(day.main.feels_like)}°{isCelsius ? 'C' : 'F'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
