import React, { useState } from 'react';
import { WiRain, WiStrongWind, WiHumidity, WiMoonAltNew } from 'react-icons/wi';
import { BsSearch, BsGeoAlt } from 'react-icons/bs';

const CityWeather = ({ cityData, handleSubmit, isCelsius, toggleTempUnit }) => {
  const [cityInput, setCityInput] = useState('');

  const handleCityInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(cityInput);
  };

  const getCurrentDateTime = (timezoneOffsetInSeconds) => {
    if (typeof timezoneOffsetInSeconds !== 'number') {
      throw new Error('timezoneOffsetInSeconds must be a number representing the offset in seconds');
    }
  
    // Create a new Date object for the current time
    const now = new Date();
  
    // Calculate local time in UTC
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  
    // Create a new Date object for the local time in the given timezone
    const localTime = new Date(utc + (timezoneOffsetInSeconds * 1000));
  
    // Format the date and time
    const day = localTime.getDate();
    const monthIndex = localTime.getMonth();
    const year = localTime.getFullYear();
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
  
    // Add leading zero to minutes and hours if necessary
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Get the month name
    const monthName = monthNames[monthIndex];
  
    return `Date: ${day} ${monthName} ${year} <br /> Time: ${formattedHours}:${formattedMinutes}`;
  };
  

  return (
    <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden w-full p-4 lg:max-w-3xl lg:mx-auto">
      {/* Search bar row */}
      <form onSubmit={handleFormSubmit} className="mb-4 w-full">
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Enter city"
            className="p-2 border border-gray-300 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
          >
            <BsSearch />
          </button>
        </div>
      </form>

      {/* Weather details */}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <WiMoonAltNew className="text-blue-400 text-3xl md:text-4xl" />
          <div className="text-xs md:text-sm mt-2" dangerouslySetInnerHTML={{ __html: getCurrentDateTime(cityData.timezone) }} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
