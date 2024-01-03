import './OctopusDashboard.css';
import {useEffect, useState} from "react";
import axios from "axios";
import OctopusDayPrice from "./OctopusDayPrice";
import {Link} from "react-router-dom";

const OctopusDashboard = props => {

    // const todaysPricesUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/electric-prices';
    let todaysPricesUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/todays-electric-prices';
    let tomorrowsPricesUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/tomorrows-electric-prices';

    if(document.location.host.indexOf('localhost') >= 0) {
        todaysPricesUrl = 'http://localhost:3000/todays-electric-prices';
        tomorrowsPricesUrl = 'http://localhost:3000/tomorrows-electric-prices';
    }

    const [todaysPrices, setTodaysPrices] = useState([])
    const [tomorrowsPrices, setTomorrowsPrices] = useState([])
    const [state, setState] = useState([]);

    const initState = function () {
        axios.get(todaysPricesUrl)
        .then(response => {
            setTodaysPrices(response.data)
        })
        .catch(error => console.error('HELP! todays prices failed', error));

        axios.get(tomorrowsPricesUrl)
        .then(response => {
            setTomorrowsPrices(response.data)
        })
        .catch(error => console.error('HELP! tomorrows prices failed', error));
    }

    useEffect(() => {
        initState();
    }, [state])

    const resetState = function () {
        setState(new Date());
    }

    const TEN_MINUTES = 600000;
    setInterval(resetState, TEN_MINUTES);

    return (
        <div className="Octopus">
            <h2>Octopus Electric Prices</h2>
            <h4>
                {new Date(todaysPrices.asOfDateTime).toLocaleString()}
                <Link to={`/octopus-details`}>More details</Link>
            </h4>
            <div className='prices'>
                <OctopusDayPrice dayPrices={todaysPrices}></OctopusDayPrice>
                <OctopusDayPrice dayPrices={tomorrowsPrices}></OctopusDayPrice>
            </div>
        </div>
    );
}

export default OctopusDashboard;

