/* eslint-disable no-unused-vars */
import {
    faCloudMoon, faDroplet, faSun,
    faTemperatureArrowDown,
    faTemperatureArrowUp,
    faTemperatureThreeQuarters, faWind
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { iconUrlFromCode } from '../../services/weatherService';
import './TempDetails.css';

  
  function TempDetails({ weatherData }) {
    const {
      details,
      icon,
      temp,
      temp_min,
      temp_max,
      sunrise,
      sunset,
      humidity,
      speed,
      feels_like,
      /* timezone */
    } = weatherData || {};
  
    return (
      <>
        <div className="tempContainer">
          <div className='tempdetails1'>
            <p>{details}</p>
          </div>
          <div className="tempdetails2">
            <img src={iconUrlFromCode(icon)} alt="Weather Icon" />
            <p>{`${temp.toFixed()}°`}</p>
          </div>
  
          <div className='tempdetails3'>
            <span className='temp_span'>
              <FontAwesomeIcon className='icon-temp' icon={faTemperatureThreeQuarters} />
              <span className="icon-label">{`${feels_like.toFixed(1)}°`}</span>
            </span>
            <span className='droplet_span'>
              <FontAwesomeIcon className="icon-droplet" icon={faDroplet} />
              <span className="icon-label">{`${humidity.toFixed(1)}%`}</span>
            </span>
            <span className='wind_span'>
              <FontAwesomeIcon className="icon-wind" icon={faWind} />
              <span className="icon-label">{`${speed.toFixed(1)} km/h`}</span>
            </span>
          </div>
        </div>
  
        <div className="tempContainer2">
          <FontAwesomeIcon icon={faSun} />
          <p className="">
            Rise: <span>{sunrise.toFormat('HH:mm')}</span>
          </p>
  
          <FontAwesomeIcon icon={faCloudMoon} />
          <p className="">
          Set: <span>{sunset.toFormat('HH:mm')}</span>
          </p>
  
          <FontAwesomeIcon icon={faTemperatureArrowUp} />
          <p className="">
            High: <span>{`${temp_max.toFixed(1)}°`}</span>
          </p>
  
          <FontAwesomeIcon icon={faTemperatureArrowDown} />
          <p className="">
            Low: <span>{`${temp_min.toFixed(1)}°`}</span>
          </p>
        </div>
      </>
    );
    
  }
  
  TempDetails.propTypes = {
    weatherData: PropTypes.shape({
      details: PropTypes.string,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      sunrise: PropTypes.object.isRequired,
      sunset: PropTypes.object.isRequired,
      humidity: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      /* timezone: PropTypes.number.isRequired, */
    }).isRequired
  };
  
  export default TempDetails;
  