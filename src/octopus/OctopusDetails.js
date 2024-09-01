import * as React from "react";
import OctopusDashboard from "./OctopusDashboard";
import {Link} from "react-router-dom";
import {useLoaderData} from "react-router";

const OctopusDetails = props => {

    const pricingData = useLoaderData();

    return (

        <div>
            <Link to={`/`}>Back</Link>

            <OctopusDashboard/>
        </div>
    )
}

export function loader() {

    let todaysPricesUrl = '/home-dashboard-service/todays-electric-prices';
    let tomorrowsPricesUrl = '/home-dashboard-service/tomorrows-electric-prices';


    var todaysPricesPromise = fetch(todaysPricesUrl);
    var tomorrowsPricesPromise = fetch(tomorrowsPricesUrl);

    return Promise.all([todaysPricesPromise, tomorrowsPricesPromise]).then(results => {
        return {
            "todaysPrices": results[0].json(),
            "tomorrowsPrices": results[1].json(),
        }
    })
}

export default OctopusDetails;