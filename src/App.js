import './App.css';
import OctopusDashboard from './octopus/OctopusDashboard'
import TubeDashboard from './travel/TubeDashboard'
import WeatherDashboard from './weather/WeatherDashboard'
import GivenergyDashboard from "./solar/GivenergyDashboard";
import Navigation from "./shared/Navigation";
import * as React from "react";



function App() {

    return (
        <div className="App">
            <Navigation/>
            <header><h1>Home dashboard</h1></header>
            <main>
                <OctopusDashboard/>
                <TubeDashboard/>
                <WeatherDashboard/>
                <GivenergyDashboard/>
            </main>
        </div>
    );
}

export default App;
