import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTemperatureHigh, faClock, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { BsSearch, BsGeoAlt, BsExclamationCircleFill } from 'react-icons/bs';

const CityWeather = ({ cityData, handleSubmit, isCelsius, toggleTempUnit, error }) => {
  const [cityInput, setCityInput] = useState('');

  const handleCityInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(cityInput);
  };

  const getCurrentDateTime = (timezoneOffsetInSeconds) => {
    // Ensure timezoneOffsetInSeconds is a number
    if (typeof timezoneOffsetInSeconds !== 'number') {
      return 'Invalid timezone data';
    }

    // Current time in UTC
    const now = new Date();
    const utcTimestamp = Date.now() + (now.getTimezoneOffset() * 60000);

    // Convert to local time
    const localTime = new Date(utcTimestamp + timezoneOffsetInSeconds * 1000);

    // Formatting date and time
    const day = localTime.getDate();
    const monthIndex = localTime.getMonth();
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[monthIndex];

    return `${day} ${monthName} ${formattedHours}:${formattedMinutes}`;
  };

  const getWeatherImageUrl = (weatherCondition) => {
    const weatherImages = {
      'Rain': '/rainy.jpg',
      'Clear': '/clear.jpg',
      'Clouds': '/clouds.jpg',
      'Snow': '/snow.jpg',
      'Windy': '/windy.jpg',
      'Smoke': '/smoke.jpg'
      // ... add more conditions and images as needed
    };

    return weatherImages[weatherCondition] || '/turbine.jpg';
  };

  return (
    <div className="mx-auto my-10 p-4 bg-white rounded-lg shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
      {/* Search bar row */}
      <form onSubmit={handleFormSubmit} className="mb-4 w-full">
        <div className="relative">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Enter city"
            className="pl-2 pr-10 py-2 border border-gray-300 rounded-lg outline-0 w-full"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 bg-blue-500 text-white px-3 rounded-r-lg"
          >
            <BsSearch />
          </button>
        </div>
      </form>

      {/* Display Error Message */}
      {error && <div className="flex items-center justify-center"><BsExclamationCircleFill className="mr-2" /> {error}</div>}

      {/* Weather details, rendered only if cityData is available */}
      {cityData && !error && (
        <div className="text-gray-700">
          {/* Location and Temperature Unit Toggle */}
          <div className="flex justify-between items-center flex-wrap sm:flex-nowrap mb-4">
            <div className="flex items-center">
              <BsGeoAlt className="text-black-400 text-3xl mr-3" />
              <span className="font-semibold text-lg">{cityData.name}, {cityData.sys.country}</span>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <button onClick={toggleTempUnit} className="text-gray-600 font-semibold text-lg">
                {isCelsius ? '°F' : '°C'}
              </button>
            </div>
          </div>

          {/* Temperature & Date row */}
          <div className="my-4 text-center">
            <span className="text-gray-800 font-bold text-4xl">{Math.round(cityData.main.temp)}</span>
            <span className="text-gray-800 font-semibold text-xl">{isCelsius ? '°C' : '°F'}</span>
            <div className="text-gray-600 text-sm">
              Feels like: {Math.round(cityData.main.feels_like)}{isCelsius ? '°C' : '°F'}
            </div>
            <div className="text-gray-600 text-sm">{cityData.weather[0].main}</div>
          </div>

          {/* Weather Illustration */}
          <img
            src={getWeatherImageUrl(cityData.weather[0].main)}
            alt="Weather Illustration"
            className="mx-auto object-fill h-60 w-120"
          />

          {/* Additional weather details row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faTemperatureHigh} size="lg" />
              <span className="text-xs mt-2">High: {Math.round(cityData.main.temp_max)}°</span>
              <span className="text-xs">Low: {Math.round(cityData.main.temp_min)}°</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faWind} size="lg" />
              <span className="text-xs mt-2">Wind: {Math.round(cityData.wind.speed)} {isCelsius ? 'm/s' : 'mph'}</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faDroplet} size="lg" />
              <span className="text-xs mt-2">Humidity: {cityData.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faClock} size="lg" />
              <span className="text-xs mt-2">{getCurrentDateTime(cityData.timezone)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
