import { DateTime } from 'luxon';



const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


export const kelvinToCelsius = (kelvin) => kelvin - 273.15;
export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
export const iconUrlFromCode = (code) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

export const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { error };
  }
};



const FORECAST_5D_3H_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetch5Day3HourForecast = async (city) => {
  try {
    const endpoint = `${FORECAST_5D_3H_BASE_URL}?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching 5-day/3-hour forecast data:", error);
    return null;
  }
};
















export const getLocalTimeForCity = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const localTime = DateTime.now().setZone(`Etc/GMT${data.timezone / 3600 * -1}`);

    return {
      time: localTime,
      name: data.name,
      country: data.sys.country
    };
  } catch (error) {
    console.error(`Failed to fetch data: ${error.message}`);
    return null;
  }
};

export const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone
  } = data;

  const { main: details, icon } = weather[0];

  const localDateTime = DateTime.fromSeconds(dt).setZone(`Etc/GMT${timezone / 3600 * -1}`);
  const localSunrise = DateTime.fromSeconds(sunrise).setZone(`Etc/GMT${timezone / 3600 * -1}`);
  const localSunset = DateTime.fromSeconds(sunset).setZone(`Etc/GMT${timezone / 3600 * -1}`);

  return {
    lat,
    lon,
    temp: kelvinToCelsius(temp),
    feels_like: kelvinToCelsius(feels_like),
    temp_min: kelvinToCelsius(temp_min),
    temp_max: kelvinToCelsius(temp_max),
    humidity,
    name,
    dt: localDateTime,
    country,
    sunrise: localSunrise,
    sunset: localSunset,
    details,
    icon,
    speed,
  };
};
