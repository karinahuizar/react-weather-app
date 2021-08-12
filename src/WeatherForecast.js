import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col">
                  <WeatherForecast
                    data={
                      <div className="col" key={index}>
                        <WeatherForecast data={dailyForecast} />
                      </div>
                    }
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    let apiKey = "4f894c5c0cfd49cc623438c61c83e0ef";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
