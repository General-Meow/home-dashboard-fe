import "./SolarDetails.css"
import {Link} from "react-router-dom";
import * as React from "react";

const SolarDetails =  (props) => {
    return (
        <div>
            <Link to={`/`}>Back</Link>
            <h1>Solar</h1>
        </div>
    );
}

export default SolarDetails;