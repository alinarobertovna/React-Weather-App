import React, { useState } from 'react';
import { WiRain, WiStrongWind, WiHumidity, WiMoonAltNew, WiCloud } from 'react-icons/wi';
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
    const year = localTime.getFullYear();
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[monthIndex];

    return `Date: ${day} ${monthName} ${year} Time: ${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden w-full p-4 lg:max-w-3xl lg:mx-auto">
      {/* Search bar row */}
    <form onSubmit={handleFormSubmit} className="mb-4 w-full">
      <div className="relative">
      <input
      type="text"
      value={cityInput}
      onChange={handleCityInputChange}
      placeholder="Enter city"
      className="pl-2 pr-10 py-2 border border-gray-300 rounded-lg w-full"
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
      {error && <div className="flex items-center justify-center"> <BsExclamationCircleFill className="mr-2" /> {error}</div>}
      
      {/* Weather details, rendered only if cityData is available */}
      {cityData && !error && (
        <div className="text-gray-700">
          {/* Location row with temperature unit toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BsGeoAlt className="text-yellow-400 text-3xl mr-3" />
              <span className="font-semibold text-lg md:text-2xl">{cityData.name}, {cityData.sys.country}</span> 
            </div>
            <button onClick={toggleTempUnit} className="text-gray-600 font-semibold text-lg md:text-2xl">
              {isCelsius ? '°F' : '°C'}
            </button>
          </div>

          {/* Temperature & Date row */}
          <div className="my-4 md:my-6 text-center">
            <span className="text-gray-800 font-bold text-4xl md:text-6xl lg:text-9xl">{Math.round(cityData.main.temp)}</span>
            <span className="text-gray-800 font-semibold text-xl md:text-2xl lg:text-4xl">{isCelsius ? '°C' : '°F'}</span>
            <div className="text-gray-600 text-sm md:text-md lg:text-lg">
              Feels like: {Math.round(cityData.main.feels_like)}{isCelsius ? '°C' : '°F'}
            </div>
          </div>

          {/* Additional weather details row */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <div className="flex flex-col items-center">
              <WiRain className="text-blue-400 text-3xl md:text-4xl" />
              <span className="text-xs md:text-sm mt-2">High: {Math.round(cityData.main.temp_max)}°</span>
              <span className="text-xs md:text-sm">Low: {Math.round(cityData.main.temp_min)}°</span>
            </div>
            <div className="flex flex-col items-center">
              <WiStrongWind className="text-teal-400 text-3xl md:text-4xl" />
              <span className="text-xs md:text-sm mt-2">Wind: {Math.round(cityData.wind.speed)} {isCelsius ? 'm/s' : 'mph'}</span>
            </div>
            <div className="flex flex-col items-center">
              <WiHumidity className="text-blue-400 text-3xl md:text-4xl" />
              <span className="text-xs md:text-sm mt-2">Humidity: {cityData.main.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <WiCloud className="text-gray-400 text-3xl md:text-4xl" />
              <span className="text-xs md:text-sm mt-2">Visibility: {isCelsius ? Math.round(cityData.visibility / 1000) + ' km' : (Math.round(cityData.visibility * 0.000621371)).toFixed(1) + ' mi'}</span>
            </div>
            <div className="flex flex-col items-center">
              <WiMoonAltNew className="text-blue-400 text-3xl md:text-4xl" />
              <div className="text-xs md:text-sm mt-2">{getCurrentDateTime(cityData.timezone)}</div> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
