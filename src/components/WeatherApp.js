import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityWeather from './CityWeather';

function WeatherApp() {
  const [city, setCity] = useState('Toronto'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const apiKey = '0cd2401e4ceeecce944c9b73fb1630e9'; // Replace with your API key

  const fetchWeatherData = async (cityName, useMetric) => {
    try {
      const unit = useMetric ? 'metric' : 'imperial';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city, isCelsius); 
  }, [city, isCelsius]); 

  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleSubmit = (cityInput) => {
    setCity(cityInput);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat">
       <div className="max-w-4xl mx-auto">
        {weatherData && (
          <CityWeather 
            cityData={weatherData} 
            handleSubmit={handleSubmit} 
            isCelsius={isCelsius} 
            toggleTempUnit={toggleTempUnit}
          />
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
