import search_icon from "../../resources/img/search.png";
import cloud_icon from "../../resources/img/cloud.png";
import drizzle_icon from "../../resources/img/drizzle.png";
import rain_icon from "../../resources/img/rain.png";
import snow_icon from "../../resources/img/snow.png";
import wind_icon from "../../resources/img/wind.png";
import humidity_icon from "../../resources/img/humidity.png";
import clear_icon from "../../resources/img/clear.png";
import { useEffect, useState, useRef } from "react";

const Weather = () => {
  const _apiKey = "appid=7b561a0b81a7a53a2ceee4fc214bce9b";
  const _apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";

  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `${_apiBase}+${city}&units=metric&${_apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: `${data.main.humidity} %`,
        windSpeed: `${data.wind.speed} Km/h`,
        temperature: `${Math.floor(data.main.temp)}°C`,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Kaliningrad");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img className="weather-icon" src={weatherData.icon} alt="" />
          <p className="temperature">{weatherData.temperature}</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
