import './WeatherCard.css'
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Icon from '@mui/material/Icon';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WavesIcon from '@mui/icons-material/Waves';

const WeatherCard = ({weatherData}) => {

    function getIcon(weatherIcon) {
        if (weatherIcon === 'Cloudy') {
            return (<CloudIcon fontSize="large"/>);
        } else if (weatherIcon === 'Sunny') {
            return (<WbSunnyIcon fontSize="large"/>);
        } else if (weatherIcon === 'Clear') {
            return (<ClearAllIcon fontSize="large"/>);
        } else if (weatherIcon === 'Rain') {
            return (<WaterDropIcon fontSize="large"/>);
        } else if (weatherIcon === 'Thunder') {
            return (<ThunderstormIcon fontSize="large"/>);
        }
        // else if(weatherIcon === 'Cloudy') {
        //     return (<CloudIcon fontSize="large"/>);
        // }else if() {
        //     return (<CloudIcon fontSize="large"/>);
        // }else if() {
        //     return (<CloudIcon fontSize="large"/>);
        // }
        return;
    }

    let card = (
        <CardContent>
            <Typography variant="body1" component="div">No data available</Typography>
        </CardContent>
    );

    if (weatherData !== undefined) {

        let fiveDayForecast = weatherData.nextFiveDays
            .map(day => {
                const icon = getIcon(day.weatherIcon);
                return (
                    <div className='day'>
                        <div className='icon'>
                            {icon}
                        </div>
                        <Typography variant="body1" component="div" className='name'>{day.dayName}</Typography>
                        <Typography variant="caption" component="div" align="center" className='forecastTemp'>H: {day.highTemp}&deg;C</Typography>
                        <Typography variant="caption" component="div" align="center" className='forecastTemp'>L: {day.lowTemp}&deg;C</Typography>
                    </div>
                );
            });

        let dfn = new Intl.DateTimeFormat('en-GB', {timeStyle: 'short', dateStyle: 'short'})

        card = (
            <CardContent>
                <header className='top'>
                    <Typography variant="body2" component="div" align="right">{dfn.format(new Date(weatherData.timestamp))}</Typography>
                </header>
                <main>
                    <div className='top'>
                        <Typography variant="h4" component="div" align="center"><WbSunnyIcon fontSize="large" sx={{
                            top: 8,
                            position: 'relative'
                        }}/>{weatherData.todaysWeather.dayName}</Typography>
                        <div className='subheading'>
                            <Typography variant="h5" component="span"
                                        align="center">{weatherData.todaysWeather.nowTemp}C</Typography>
                            <div>
                                <Typography variant="body2" component="span"
                                            align="center">High: {weatherData.todaysWeather.highTemp}C</Typography>
                                <Typography variant="body2" component="span" align="center"
                                            sx={{
                                                position: 'relative',
                                                left: 5
                                            }}>Low: {weatherData.todaysWeather.lowTemp}C</Typography>
                            </div>
                        </div>
                    </div>
                </main>
                <Divider variant="middle" component="div" sx={{my: '10px'}}/>

                <footer>
                    {fiveDayForecast}
                </footer>
            </CardContent>
        );
    }

    return (
        <Card raised={true} sx={{width: 450, height: 240}} className='WeatherCard'>{card}</Card>
    )
}

export default WeatherCard;