import React, { useState } from 'react';
import axios from 'axios';
import CityWeather from './CityWeather';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [apiKey] = useState('0cd2401e4ceeecce944c9b73fb1630e9');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Приложение для погоды</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Введите город"
              value={city}
              onChange={handleCityChange}
              className="p-2 rounded border mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Получить погоду
            </button>
          </form>
          {weatherData && <CityWeather cityData={weatherData} />}
        </div>
      </div>
    );
}

export default WeatherApp;
