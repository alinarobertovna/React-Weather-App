import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityWeather from './CityWeather';
import FiveDayForecast from './ForecastData';

function WeatherApp() {
  const [city, setCity] = useState('Toronto'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const apiKey = '0cd2401e4ceeecce944c9b73fb1630e9'; 
  const [error, setError] = useState('');

  const fetchWeatherData = async (cityName, useMetric) => {
    try {
      const unit = useMetric ? 'metric' : 'imperial';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`
      );
      setWeatherData(response.data);
      setError(''); // Clear any existing error
    } catch (error) {
      setError('City not found. Please try again.'); // Set error message on failure
      setWeatherData(null); // Reset weather data on failure
    }
    try {
      const unit = useMetric ? 'metric' : 'imperial';
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${unit}`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      // Handle forecast fetch error
      console.error('Error fetching forecast:', error);
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
        <CityWeather 
          cityData={weatherData} 
          handleSubmit={handleSubmit} 
          isCelsius={isCelsius} 
          toggleTempUnit={toggleTempUnit}
          error={error}
        />
        <FiveDayForecast 
        forecastData={forecastData}
        isCelsius={isCelsius}
        toggleTempUnit={toggleTempUnit} 
        error={error} />
      </div>
    </div>
  );
}

export default WeatherApp;
