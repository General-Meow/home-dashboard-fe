import * as React from "react";
import OctopusDashboard from "./OctopusDashboard";
import {Link} from "react-router-dom";

const OctopusDetails = props => {
    return (

        <div>
            <Link to={`/`}>Back</Link>

            <OctopusDashboard/>
        </div>
    )
}

export default OctopusDetails;