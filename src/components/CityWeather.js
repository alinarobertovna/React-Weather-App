import React from 'react';

function CityWeather({ cityData }) {
  return (
    <div>
      <h2>Погода в {cityData.name}, {cityData.sys.country}</h2>
      <p>Температура: {cityData.main.temp}°C</p>
      <p>Влажность: {cityData.main.humidity}%</p>
      <p>Скорость ветра: {cityData.wind.speed} м/с</p>
    </div>
  );
}

export default CityWeather;