/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast/Forecast';
import MainCities from './components/MainCities/MainCities';
import TempDetails from './components/TempDetails/TempDetails';
import Timelocation from './components/TimeLocation/timelocation';
import Header from './components/header/Header';
import SearchBox from './components/searchBox/searchBox';

import { fetch5Day3HourForecast, fetchWeatherData, formatCurrentWeather, getLocalTimeForCity } from './services/weatherService';


function App() {
    
    const [localTime, setLocalTime] = useState(null);
    const [cityName, setCityName] = useState('İstanbul');
    const [countryCode, setCountryCode] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState({ list: [] });
    const [error, setError] = useState(null);

    const handleCityClick = async (selectedCity) => {
        const { data, error } = await fetchWeatherData(selectedCity);
        if (error) {
            alert("Please type a correct city name.");
        } else {
            setCityName(selectedCity);
        }
    };

    useEffect(() => {
        getLocalTimeForCity(cityName).then(data => {
            if (data) {
                setLocalTime(data.time);
                setCityName(data.name);
                setCountryCode(data.country);
            }
        });

        fetchWeatherData(cityName).then(data => {
            const formattedWeather = formatCurrentWeather(data);
            setWeatherData(formattedWeather);
        });

        fetch5Day3HourForecast(cityName).then(data => {
            setForecastData(data);
        });
    }, [cityName]);

    useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await fetchWeatherData(cityName);
      
          if (error) {
            setError(`Error: ${error.message}`);
          } else {
            const formattedWeather = formatCurrentWeather(data);
            setWeatherData(formattedWeather);
            setError(null); 
          }
        };
      
        fetchData();
      }, [cityName]);

    
   


    return (
        <>
            <header>
                <Header />
            </header>

            <main>
               

                
                <Timelocation time={localTime} location={`${cityName}, ${countryCode}`} />
                
                {weatherData && <TempDetails weatherData={weatherData} />}

                 
                {error && <div className="error-message">{error}</div>}

                <SearchBox onSearch={handleCityClick} />

                <MainCities onCityClick={handleCityClick} />  

                <Forecast forecastData={forecastData} />


                

            </main>
        </>
    );
}

export default App;
