import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [weatherData , setWeatherData] = useState(null);
    const apikey = 'apiKey';
    const city = "City"
    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
          .then((response) => {
            setWeatherData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
      }, [city, apikey]);

      
  return (
    <div>
     
    </div>
  )
}

export default Weather
