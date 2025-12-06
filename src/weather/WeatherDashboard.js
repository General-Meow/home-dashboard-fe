import './WeatherDashboard.css'
import {useEffect, useState} from "react";
import axios from 'axios';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {defaultBackendUrl} from "../App";

function WeatherDashboard() {
    let todaysWeatherUrl = defaultBackendUrl + 'todays-weather';
    let forecastWeatherUrl = defaultBackendUrl + 'forecast-weather';
    if (document.location.host.indexOf('localhost') >= 0) {
        todaysWeatherUrl = 'http://localhost:3000/todays-weather';
        forecastWeatherUrl = 'http://localhost:3000/forecast-weather';
    }

    const [day, setDay] = useState({});
    const [todaysHourlyWeather, setTodaysHourlyWeather] = useState([]);
    const [forecastHourlyWeather, setForecastHourlyWeather] = useState([]);
    const [asOfDateTime, setAsOfDateTime] = useState([]);
    const [reset, setReset] = useState([]);

    const initWeatherState = function (data, setState, isTomorrow) {
        const table = [];
        const result = [];
        var asOfDate = new Date(data.asOfDateTime);
        let fromNow = false;

        for (let hourOfWeather of data.hourlyWeatherArray) {

            var hourDate = new Date(hourOfWeather.hour);
            const hour = hourDate.toLocaleTimeString();
            const imageSrc = hourOfWeather.description.replaceAll(' ', '-').toLowerCase().concat('.png');
            let style = '';
            if (asOfDate.getHours() === hourDate.getHours()) {
                style = 'now';
                fromNow = true;
            }

            if (fromNow || isTomorrow) {
                result.push((
                    <TableRow key={`weather` + hour} className={style}>
                        <TableCell><img title={hourOfWeather.description} src={'home-dashboard/' + imageSrc}
                                        alt="weather description"/></TableCell>
                        <TableCell>T: {hour} </TableCell>
                        <TableCell>{hourOfWeather.tempurature}c</TableCell>
                        <TableCell>rain%: {hourOfWeather.chanceOfRain} </TableCell>
                    </TableRow>
                ))
            }
            ;
        }

      table.push(
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                    colSpan='4'>{day.day} - {day.description} - {asOfDateTime.toLocaleString()}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result}
            </TableBody>
          </Table>
      );

        setDay({"day": data.day, "description": data.description});
        setState(table);
        setAsOfDateTime(asOfDate)
    }

    useEffect(() => {
        axios.get(todaysWeatherUrl)
            .then(response => {
                initWeatherState(response.data, setTodaysHourlyWeather, false);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get(forecastWeatherUrl)
            .then(response => {
                initWeatherState(response.data.week[0], setForecastHourlyWeather, true);
            })
            .catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset])

    const resetState = function () {
        setReset(new Date());
    }

    const TEN_MINUTES = 600000;
    setInterval(resetState, TEN_MINUTES);

    return (
        <div className='Weather'>
            <h2>Weather</h2>
            <div className='today'>
              {todaysHourlyWeather}
            </div>
          <div className='tomorrow'>
              {forecastHourlyWeather}
            </div>
        </div>
    );
}

export default WeatherDashboard;