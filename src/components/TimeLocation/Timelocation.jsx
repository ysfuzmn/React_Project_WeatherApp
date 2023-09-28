/* eslint-disable no-unused-vars */
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import React from 'react';
import './Timelocation.css';

function Timelocation({ time, location }) {
  
  
  const formattedTime = time ? time.toLocaleString(DateTime.DATETIME_MED) : 'Loading...';

  return (
    <>
      <div className="time">
        <p className="">{formattedTime}</p>
      </div>

      <div className="location">
        <p className="">{location || 'Loading...'}</p>
      </div>
    </>
  );
}


Timelocation.propTypes = {
  time: PropTypes.instanceOf(DateTime),  
  location: PropTypes.string             
};

export default Timelocation;
