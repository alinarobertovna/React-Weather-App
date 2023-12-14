import React from 'react';
import WeatherApp from './components/WeatherApp';

function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${"./bg-img.jpg"})` }}
    >
      <WeatherApp />
    </div>
  );
}

export default App;
