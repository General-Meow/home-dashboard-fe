import './App.css';
import OctopusDashboard from './octopus/OctopusDashboard'
import TubeDashboard from './travel/TubeDashboard'
import WeatherDashboard from './weather/WeatherDashboard'
import GivenergyDashboard from "./solar/GivenergyDashboard";
import Navigation from "./shared/Navigation";
import OctopusCard from "./octopus/OctopusCard";
import * as React from "react";
import TravelCard from "./travel/TravelCard";
import SolarCard from "./solar/SolarCard";
import WeatherCard from "./weather/WeatherCard";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import axios from "axios";



function App() {

    let dashboardUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/dashboard';

    if(document.location.host.indexOf('localhost') >= 0) {
        dashboardUrl = 'http://localhost:3000/dashboard';
    }

    const [dashboardData, setDashboardData] = useState([])
    const [state, setState] = useState([]);

    const initState = async function () {
        const response = await fetch(dashboardUrl);
        const responseData = await response.json();

        setDashboardData(responseData);
            // .then(async (response) => {
            //     console.log('got dashboard data');
            //     const data = await response.json();
            //     console.log(data);
            //     setDashboardData(data);
            // })
            // .catch(error => console.error('HELP! dashboard data', error));
    }

    useEffect(() => {
        initState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const resetState = function () {
        setState(new Date());
    }

    const TEN_MINUTES = 600000;
    setInterval(resetState, TEN_MINUTES);

    return (
        <div className="App">
            {/*<Navigation/>*/}
            <header>
                <Typography variant="h3" component="div" gutterBottom>
                    Home dashboard <DashboardIcon fontSize='large'/>
                </Typography>
            </header>
            <main className="dashboard">
                <OctopusCard energy={dashboardData.energy}/>
                <TravelCard travelData={dashboardData.travel}/>
                <WeatherCard weatherData={dashboardData.weather}/>
                <SolarCard solarData={dashboardData.solar}/>
                {/*<OctopusDashboard/>*/}
                {/*<TubeDashboard/>*/}
                {/*<WeatherDashboard/>*/}
                {/*<GivenergyDashboard/>*/}
            </main>
        </div>
    );
}

export default App;
