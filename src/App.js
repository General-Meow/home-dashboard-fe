import './App.css';
import OctopusCard from "./octopus/OctopusCard";
import * as React from "react";
import TravelCard from "./travel/TravelCard";
import SolarCard from "./solar/SolarCard";
import WeatherCard from "./weather/WeatherCard";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrentTime from "./shared/CurrentTime";
import {redirect, useLoaderData, useNavigate} from "react-router";
import {Form} from "react-router-dom";



function App() {
    let dashboardData = useLoaderData();
    let interval = undefined;

    const TEN_MINUTES = 600000;

    useEffect(() => {
        //every 10 mins, get the submit button and press it
        interval = setInterval(() => {
            var elementById = document.getElementById('aa');
            elementById.click();
        }, TEN_MINUTES);

        return function() {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="App">
            <header>
                <Typography variant="h3" component="div" gutterBottom>
                    Home dashboard <DashboardIcon fontSize='large'/>
                </Typography>
                <CurrentTime></CurrentTime>
            </header>
            <main className="dashboard">
                <OctopusCard energy={dashboardData.energy}/>
                <TravelCard travelData={dashboardData.travel}/>
                <WeatherCard weatherData={dashboardData.weather}/>
                <SolarCard solarData={dashboardData.solar}/>

                {/*hack to hook into the action flow and retrigger a component refresh*/}
                <Form method='post' id='derp' hidden>
                    <button type='submit' id='aa'>submit</button>
                </Form>
            </main>
        </div>
    );
}

async function loader() {

    let dashboardUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/dashboard';
    if(document.location.host.indexOf('localhost') >= 0) {
        dashboardUrl = 'http://localhost:3000/dashboard';
    }
    var responsePromise = await fetch(dashboardUrl);
    return responsePromise.json();
}

async function action(request) {
    return redirect('/');
}

export {App, loader, action};
