import {Typography} from "@mui/material";
import './CurrentTime.css';
import {useEffect, useState} from "react";

const CurrentTime = props => {

    const [nowFormatted, setNowFormatted] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        resetState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])


    function resetState() {
        setNowFormatted(getTime());
    }

    function getTime() {
        const now = new Date();
        const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
            day: "numeric",
            month: "numeric",
            year: "numeric",

            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone: "Europe/London",
            timeZoneName: "short"});
        return dateTimeFormatter.format(now);
    };

    const ONE_MINUTE = 1000 * 60;
    setInterval(resetState, ONE_MINUTE);


    return (
        <span class='CurrentTime'>
            <Typography variant='body1'>
                {nowFormatted}
            </Typography>
        </span>
    );
}

export default CurrentTime;