import './WeatherDashboard.css'
import {useEffect, useState} from "react";
import axios from 'axios';

function WeatherDashboard() {
  let weatherUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/todays-weather';
  if(document.location.host.indexOf('localhost') >= 0) {
    weatherUrl = 'http://localhost:3000/todays-weather';
  }

  const [day, setDay] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [asOfDateTime, setAsOfDateTime] = useState([]);
  const [reset, setReset] = useState([]);

  const initState = function(response) {
    const result = [];
    for (let hourOfWeather of response.data.hourlyWeatherArray) {
      const hour = new Date(hourOfWeather.hour).toLocaleTimeString();
      const imageSrc = hourOfWeather.description.replaceAll(' ', '-').toLowerCase().concat('.png');
      result.push( (
          <tr key={`weather`+hour}>
            <td><img title={hourOfWeather.description} src={imageSrc}/></td>
            <td>Time: {hour} </td>
            <td>Temp: {hourOfWeather.tempurature}c </td>
            <td>Chance of rain: {hourOfWeather.chanceOfRain} </td>
          </tr>
      ));
    }
    setDay({"day": response.data.day, "description": response.data.description});
    setHourlyWeather(result);
    setAsOfDateTime(new Date(response.data.asOfDateTime))
  }

  useEffect(() =>{
    axios.get(weatherUrl)
    .then(response => {
      initState(response);
    })
    .catch(error => {
      console.error(error);
    })
  }, [reset])

  const resetState = function () {
    setReset(new Date());
  }

  const TEN_MINUTES = 600000;
  setInterval(resetState, TEN_MINUTES);

  return (
      <div className='Weather'>
        <h2>Weather</h2>
        <div>
          <h4>{day.day} - {day.description} - {asOfDateTime.toLocaleString()}</h4>
          <table>
            <tbody>
              {hourlyWeather}
            </tbody>
          </table>
        </div>
      </div>
  );
}
export default WeatherDashboard;