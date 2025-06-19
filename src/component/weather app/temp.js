import React, { useEffect, useState } from 'react';
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {
  const [searchValue, setSearchvalue] = useState('Hubli');
  const [tempinfo, setTempInfo] = useState({});

  const getWatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=54305fe5ed828635e015480a868661cf`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  useEffect(() => {
  getWatherInfo();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWatherInfo}>
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInfo={tempinfo} />
    </>
  );
};

export default Temp;
