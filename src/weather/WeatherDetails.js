import "./WeatherDetails.css"
import {Link} from "react-router-dom";
import * as React from "react";

const WeatherDetails =  (props) => {
    return (
        <div>
            <Link to={`/`}>Back</Link>
            <h1>Weather</h1>
        </div>
    );
}

export default WeatherDetails;