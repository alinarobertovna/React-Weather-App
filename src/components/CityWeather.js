import React, { useState } from 'react';
import { WiDaySunny, WiRain, WiStrongWind, WiHumidity, WiBarometer } from 'react-icons/wi';
import { BsSearch } from 'react-icons/bs';

const CityWeather = ({ cityData, handleSubmit, isCelsius, toggleTempUnit }) => {
  const [cityInput, setCityInput] = useState('');

  const handleCityInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(cityInput);
  };

  return (
    <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden w-full md:w-[200%] h-auto ml-0 p-4 md:p-8">
      {/* Search bar row */}
      <form onSubmit={handleFormSubmit} className="mb-4 w-full">
        <div className="flex">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Enter city"
            className="p-2 border border-gray-300 rounded-l-lg flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center"
          >
            <BsSearch />
          </button>
        </div>
      </form>

      {/* Celsius/Fahrenheit toggle */}
      <div className="mb-4">
        <button onClick={toggleTempUnit} className="text-gray-600 text-sm">
          {isCelsius ? '°F' : '°C'}
        </button>
      </div>

      {/* Weather details */}
      <div className="flex flex-col items-center justify-center text-gray-700">
        {/* Location row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4">
          <div className="flex items-center">
            <WiDaySunny className="text-yellow-400 text-3xl mr-3" />
            <span className="font-semibold text-lg md:text-2xl">{cityData.name}, {cityData.sys.country}</span>
          </div>
        </div>

        {/* Temperature & Date row */}
        <div className="my-4 md:my-6 text-center">
          <span className="text-gray-800 font-bold text-6xl md:text-9xl">{Math.round(cityData.main.temp)}</span>
          <span className="text-gray-800 font-semibold text-xl md:text-2xl">{isCelsius ? '°C' : '°F'}</span>
          <p className="text-gray-600 text-md md:text-lg">Today</p>
        </div>

        {/* Additional weather details row */}
        <div className="grid grid-cols-4 gap-4 w-full">
          <div className="flex flex-col items-center">
            <WiRain className="text-blue-400 text-3xl md:text-4xl" />
            <span className="text-xs md:text-sm mt-2">High: {Math.round(cityData.main.temp_max)}°</span>
            <span className="text-xs md:text-sm">Low: {Math.round(cityData.main.temp_min)}°</span>
          </div>
          <div className="flex flex-col items-center">
            <WiStrongWind className="text-teal-400 text-3xl md:text-4xl" />
            <span className="text-xs md:text-sm mt-2">Wind: {cityData.wind.speed} {isCelsius ? 'm/s' : 'mph'}</span>
          </div>
          <div className="flex flex-col items-center">
            <WiHumidity className="text-blue-400 text-3xl md:text-4xl" />
            <span className="text-xs md:text-sm mt-2">Humidity: {cityData.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center">
            <WiBarometer className="text-purple-400 text-3xl md:text-4xl" />
            <span className="text-xs md:text-sm mt-2">Pressure: {isCelsius ? cityData.main.pressure + ' hPa' : (cityData.main.pressure * 0.02953).toFixed(2) + ' inHg'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
