import "./TravelDetails.css"
import {Link} from "react-router-dom";
import * as React from "react";

const TravelDetails =  (props) => {
    return (
        <div>
            <Link to={`/`}>Back</Link>
            <h1>Travel</h1>
        </div>
    );
}

export default TravelDetails;