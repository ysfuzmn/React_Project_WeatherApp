/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import React from 'react';
import './MainCities.css';



function MainCities({ onCityClick }) {  


        const cities = [
            {
            id:1,
            title:'İstanbul'
            },

            {
            id:2,
            title:'London'
            },

            {
            id:3,
            title:'Paris'
            },

            {
            id:4,
            title:'Berlin'
            },

            {
            id:5,
            title:'Atina'
            }

            ]   


            return (
                <div className="main_cities">
                    {cities.map((city) => (
                        <button 
                    className="cities_btn" 
                    key={city.id}
                    onClick={() => onCityClick(city.title)} 
                >
                    {city.title}
                </button>
                    ))}
                </div>
              );
              
}
MainCities.propTypes = {
    onCityClick: PropTypes.func.isRequired
};

export default MainCities