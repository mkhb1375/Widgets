import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint } from '@fortawesome/free-solid-svg-icons';

export default function Weather() {
    const [cityName, setCityName] = useState("");
    const [cityName2, setCityName2] = useState("");
    const [cityCor, setCityCor] = useState({ 0: null, 1: null });
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function getLocationData() {
            try {
                const response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=4fce750d56942bace531c87c578ea566`
                );
                const jsonData = await response.json();
                if (jsonData.length > 0) {
                    setCityCor({ 0: jsonData[0].lat, 1: jsonData[0].lon });
                    setCityName2(jsonData[0].name);
                }
            } catch (error) {
                console.log("Error fetching location data:", error);
            }
        }
        getLocationData();
    }, [cityName]);

    useEffect(() => {
        async function getWeatherData() {
            if (cityCor[0] !== null && cityCor[1] !== null) {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${cityCor[0]}&lon=${cityCor[1]}&appid=4fce750d56942bace531c87c578ea566&units=metric`
                    );
                    const jsonData = await response.json();
                    setWeather(jsonData);
                } catch (error) {
                    console.log("Error fetching weather data:", error);
                }
            }
        }
        getWeatherData();
    }, [cityCor]);

    function handleSubmit(e) {
        e.preventDefault();
        const cityName = e.target.value;
        setCityName(cityName);
    }

    return (
        <div className="col align-items-end h4 bg-secondary text-white container p-3 m-3 rounded">
            <input
                style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
                className="text-center h5 text-black"
                placeholder="Enter city name"
                onChange={(e) => handleSubmit(e)}
                type="text"
            />

            {weather && (
                <div>
                    <div className="row " >
                        <h2 className="col text-center ">{cityName2}</h2>
                        <span className="col  text-center ">
                            <img


                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                alt="Weather Icon"
                                title={weather.weather[0].description}
                            />
                        </span>
                    
                    </div>
                    <div className="row">
                        <h3 className="col text-center ">
                        <FontAwesomeIcon icon={faTemperatureHigh} /> {weather.main.temp} °C
                    </h3>
                        <h3 className="col text-center ">
                        <FontAwesomeIcon icon={faTint} /> {weather.main.humidity}%
                    </h3>
                    </div>
                </div>

            )}
        </div>
    );
}
