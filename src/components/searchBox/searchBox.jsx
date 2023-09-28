/* eslint-disable no-unused-vars */

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SearchBox.css';


import PropTypes from 'prop-types';

function SearchBox({ onSearch }) { 

    const handleSearchClick = async () => {
        const cityValue = document.querySelector('.search-input').value;
        if (cityValue.trim() === "") {
            alert("Please enter a valid city name");
            return;
        }
        await onSearch(cityValue);
    };
  
    return (
        <div className="search">
            <div className="search_container">
                <input type="text" placeholder='Search for the city' className="search-input" />
                <button className="search-btn" onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                </button>
            </div>
            <div className="results_container">
                <ul className='results'>
                </ul>
            </div>
        </div>
    )
  }
 
  SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired
};
export default SearchBox;
