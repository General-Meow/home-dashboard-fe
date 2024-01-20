import './TubeDashboard.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableRow} from "@mui/material";


const status = function (line, statuses) {
    const result = [];

    for (var i = 0; i < statuses.length; i++) {
        const lineStatus = statuses[i];
        const key = line.name + i;
        const classNameText = lineStatus.status.toLowerCase().replace(/ /g,'');
        result.push((
            <TableRow className='line'>
                <TableCell key={key} className={classNameText}>
                    {lineStatus.status} {lineStatus.description}
                </TableCell>
            </TableRow>
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
                <>
                    <TableRow key={lineStatus.name + ' ' + index} className={lineStatus.id + ' lineName'}>
                        <TableCell>
                            {/*<div className={lineStatus.id + ' lineName'}>{lineStatus.name}</div>*/}
                            {/*{status(lineStatus, lineStatus.statuses)}*/}
                            {lineStatus.name}
                        </TableCell>
                    </TableRow>
                            {status(lineStatus, lineStatus.statuses)}
                </>
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
            .catch(error => {
                console.error('Error thrown while getting data', error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {lineStatuses}
                </TableBody>
            </Table>
        </div>
    );
}

export default TubeDashboard;