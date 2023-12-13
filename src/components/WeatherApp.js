import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityWeather from './CityWeather';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '0cd2401e4ceeecce944c9b73fb1630e9';

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData('Toronto'); 
  }, []);

  const handleSubmit = (cityInput) => {
    fetchWeatherData(cityInput); 
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: 'url(https://example.com/background.jpg)' }}>
      <div className="max-w-4xl mx-auto">
        {weatherData && <CityWeather cityData={weatherData} handleSubmit={handleSubmit} />}
      </div>
    </div>
  );
}

export default WeatherApp;
