import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTemperatureHigh, faClock, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { BsSearch, BsGeoAlt, BsExclamationCircleFill } from 'react-icons/bs';
import './tailwindstyles.css';

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

  const CityIllustrations = {
    'Moscow': '/moscow.jpg',
    'New York': '/new york.jpg',
    'Toronto': '/toronto.jpg',
    'Dubai': '/dubai.jpg',
    'San Francisco': '/san-fran.jpg',
    'Cairo': '/cairo.jpg',
    'Berlin': '/berlin.jpg',
    'Paris': '/paris.jpg',
    'Rome': '/rome.jpg',
    'Venice': '/venice.jpg',
    'London': '/london.jpg',
    'Cancún' : '/cancun.jpg',
    'Taipei': '/taipei.jpg',
    'Hong Kong' : '/skyline.jpg',
    'Las Vegas':'/las vegas.jpg',
    'Athens': '/athens.jpg',
    'Rio de Janeiro': '/rio.jpg',
    'Sydney': '/sydney.jpg',
    'Madrid': '/madrid.jpg',
    'São Paulo': '/sao paolo,jpg',
    'Agra': '/agra.jpg',
    'Ahmedabad': '/ahmedabad.jpg',
    'Miami': '/miami.jpg'
  };
  
  const CountryIllustrations = {
    'RU': '/winter.jpg',
    'US': '/usa.jpg',
    'FI': '/finland.jpg',
    'PE' : '/peru.jpg',
    'VN': '/vietnam.jpg',
    'GR': '/greece.jpg',
    'AU': '/koala.jpg',
    'AF': '/af.jpg',
    'ES': '/spain.jpg',
    'CY' : '/sand castle.jpg',
    'FR' : '/france.jpg',
    'BE': '/europe.jpg',
    'CA': '/canada.jpg',
    'IR': '/iran.jpg',
    'NL': '/nl.jpg',
    'IT': '/italy.jpg',
    'ID': '/bali.jpg',
    'CU': '/cuba.jpg',
    'SG': '/skyline.jpg',
    'CN': '/train.jpg',
    'LK': '/bali.jpg',
    'KE': '/safari.jpg',
    'NE': '/safari.jpg',
    'TZ': '/safari.jpg',
    'NA': '/safari.jpg',
    'MX': '/mexico.jpg',
    'IE': '/ireland.jpg',
    'MV': '/coconut.jpg',
    'IL': '/israel.jpg',
    'AQ': '/polar bear.jpg',
    'AT': '/baidarka.jpg',
    'CH': '/lake.jpg',
    'TR': '/market.jpg'
  };
  
  const DefaultIllustration = '/default2.jpg';

  const getIllustration = (cityName, countryName) => {
    if (CityIllustrations[cityName]) {
      return CityIllustrations[cityName];
    } else if (CountryIllustrations[countryName]) {
      return CountryIllustrations[countryName];
    } else {
      return DefaultIllustration;
    }
  };

  return (
    <div className="container">
      {/* Search bar row */}
      <form onSubmit={handleFormSubmit} className="mb-4 w-full">
        <div className="relative">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Enter city"
            className="search-input"
          />
          <button
            type="submit"
            className="search-button"
          >
            <BsSearch />
          </button>
        </div>
      </form>

      {/* Display Error Message */}
      {error && <div className="error-msg"><BsExclamationCircleFill className="mr-2" /> {error}</div>}

      {/* Weather details, rendered only if cityData is available */}
      {cityData && !error && (
        <div className="text-gray-700">
          {/* Location and Temperature Unit Toggle */}
          <div className="location-units-row">
            <div className="flex items-center">
              <BsGeoAlt className="location-icon" />
              <span className="location-text">{cityData.name}, {cityData.sys.country}</span>
            </div>
            <div className="unit-toggle">
              <button onClick={toggleTempUnit} className="unit-toggle-btn">
                {isCelsius ? '°F' : '°C'}
              </button>
            </div>
          </div>

          {/* Temperature & Date row */}
          <div className="my-4 text-center">
            <span className="temp-row">{Math.round(cityData.main.temp)}</span>
            <span className="unit">{isCelsius ? '°C' : '°F'}</span>
            <div className="real-temp-row">
              Feels like: {Math.round(cityData.main.feels_like)}{isCelsius ? '°C' : '°F'}
            </div>
            <div className="weather-desc">{cityData.weather[0].main}</div>
          </div>

          {/* Weather Illustration */}
          <img
            src={getIllustration(cityData.name, cityData.sys.country)}
            alt="Weather Illustration"
            className="illustration"
          />
          <br></br>

          {/* Additional weather details row */}
          <div className="details-panel">
            <div className="details-panel-item">
              <FontAwesomeIcon icon={faTemperatureHigh} size="lg" />
              <span className="details-panel-item-desc">High: {Math.round(cityData.main.temp_max)}°</span>
              <span className="text-xs">Low: {Math.round(cityData.main.temp_min)}°</span>
            </div>
            <div className="details-panel-item">
              <FontAwesomeIcon icon={faWind} size="lg" />
              <span className="details-panel-item-desc">Wind: {Math.round(cityData.wind.speed)} {isCelsius ? 'm/s' : 'mph'}</span>
            </div>
            <div className="details-panel-item">
              <FontAwesomeIcon icon={faDroplet} size="lg" />
              <span className="details-panel-item-desc">Humidity: {cityData.main.humidity}%</span>
            </div>
            <div className="details-panel-item">
              <FontAwesomeIcon icon={faClock} size="lg" />
              <span className="details-panel-item-desc">{getCurrentDateTime(cityData.timezone)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
