/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { kelvinToCelsius } from '../../services/weatherService';
import './Forecast.css';

function Forecast({ forecastData }) {
  
  const hourlyData = forecastData.list.slice(0, 5);

    const groupedByDay = forecastData.list.reduce((acc, data) => {
        const date = new Date(data.dt * 1000).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(data);
        return acc;
    }, {});

    const dailyData = Object.values(groupedByDay).slice(0, 5).map(dayData => ({
        dt: dayData[0].dt,
        weather: dayData[0].weather,
        temp: {
            day: (dayData.reduce((sum, { main }) => sum + main.temp, 0)) / dayData.length
        }
    }));

  return (
      <>
          <div className="header-container">
              <h4 className='hourly_hr'>Hourly Forecast</h4>
              <h4 className='daily_hr'>Daily Forecast</h4>
          </div>
          <hr />

          <div className="forecast_container">
              {/* Hourly Forecast */}
              <div className="forecast">
                  {hourlyData.map((hour, index) => (
                      <div key={index} className="forecast_hours">
                          <h5>{new Date(hour.dt * 1000).toLocaleTimeString()}</h5>
                          <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather Icon" />
                          <p>{Math.round(kelvinToCelsius(hour.main.temp))}°C</p>
                      </div>
                  ))}
              </div>

              {/* Daily Forecast */}
              <div className="forecast2">
                  {dailyData.map((day, index) => (
                      <div key={index} className="forecast_hours2">
                          <h5>{new Date(day.dt * 1000).toLocaleDateString()}</h5>
                          <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather Icon" />
                          <p>{Math.round(kelvinToCelsius(day.temp.day))}°C</p>
                      </div>
                  ))}
              </div>
          </div>
      </>
  );
}

Forecast.propTypes = {
  forecastData: PropTypes.shape({
      list: PropTypes.arrayOf(
          PropTypes.shape({
              dt: PropTypes.number.isRequired,
              main: PropTypes.shape({
                  temp: PropTypes.number.isRequired,
              }).isRequired,
              weather: PropTypes.arrayOf(
                  PropTypes.shape({
                      icon: PropTypes.string.isRequired,
                  })
              ).isRequired,
          })
      ).isRequired
  }).isRequired,
};

export default Forecast;

