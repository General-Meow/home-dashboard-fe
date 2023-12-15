import './TubeDashboard.css'
import {useEffect, useState} from "react";
import axios from "axios";


const status = function (line, statuses) {
    const result = [];

    for (var i = 0; i < statuses.length; i++) {
        const lineStatus = statuses[i];
        const key = line.name + i;
        const classNameText = lineStatus.status.toLowerCase().replace(/ /g,'');
        result.push((
            <div key={key} className={classNameText}>{lineStatus.status} {lineStatus.description}</div>
        ))
    }

    return result;
}


function TubeDashboard() {
    let url;
    if(document.location.host.indexOf('localhost') >= 0) {
        url = 'http://localhost:3000/tube-status';
    } else {
        url = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/tube-status';
    }

    var [lineStatuses, setLineStatuses] = useState([]);
    var [asOfDate, setAsOfDate] = useState([]);
    var [state, setState] = useState([]);

    const initState = function(response) {
        const result = []
        for (let index in response.data.lineStatuses) {
            const lineStatus = response.data.lineStatuses[index];
            result.push((
                <tr key={lineStatus.name + ' ' + index} className='line'>
                    <td>
                        <div className={lineStatus.id + ' lineName'}>{lineStatus.name}</div>
                        {status(lineStatus, lineStatus.statuses)}
                    </td>
                </tr>
            ))
        }
        setLineStatuses(result);
        setAsOfDate(new Date(response.data.createdDate).toLocaleString())
    }

    useEffect(() => {
        axios.get(url)
            .then(response => {
                initState(response);
            })
            .catch(error => console.error(error))
    }, [state]);

    const resetState = function () {
        setState(new Date());
    }

    const TEN_MINUTES = 600000;
    setInterval(resetState, TEN_MINUTES);

    return (
        <div className='TubeDashboard'>
            <h2>TFL Status</h2>
            <h4>Date: {asOfDate}</h4>
            <table>
                <tbody>
                    {lineStatuses}
                </tbody>
            </table>
        </div>
    );
}

export default TubeDashboard;