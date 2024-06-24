import './OctopusCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {CardActionArea, CardActions} from "@mui/material";

const OctopusCard = ({energy}) => {
    let nextThreeHours = [];
    if (energy !== undefined) {
        const nextThreeHoursTemp = energy.next3HoursPriceArr
            .filter(entry => {
                let now = new Date();
                let fromTime = new Date(entry.fromDateTime);
                let toTime = new Date(entry.toDateTime);

                return (((fromTime < now) && (toTime > now)) || (fromTime > now))
            })
            .slice(0, 6);

        const temp = [];
        for (let i = 0; i < nextThreeHoursTemp.length - 1; i=i+2) {
            temp.push(
                {
                    fromDateTime: nextThreeHoursTemp[i].fromDateTime,
                    toDateTime: nextThreeHoursTemp[i+1].toDateTime,
                    prices: `${nextThreeHoursTemp[i].price}p, ${nextThreeHoursTemp[i+1].price}p`
                }
                );
        }

        nextThreeHours = temp.map(entry => {
                    let fromTime = new Date(entry.fromDateTime);
                    let toTime = new Date(entry.toDateTime);
                    let fromTimeString = fromTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    let toTimeString = toTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    return (
                        <div>
                            <Typography variant="body2" component="span" className='time'>{fromTimeString} - {toTimeString}</Typography>
                            <Typography variant="body2" component="span" className='prices'>{entry.prices}</Typography>
                        </div>
                    );
                }
            );
    }

    let card = (
        <CardContent>
            <Typography variant="body1" component="div">No data available</Typography>
        </CardContent>
    );
    if (energy !== undefined) {

        let currentPriceStyle = 0;
        if(energy.currentElectricPrice > 20) {
            currentPriceStyle = 'reallyAvoidUsage';
        } else if(energy.currentElectricPrice > 13 && energy.currentElectricPrice <= 20) {
            currentPriceStyle = 'avoidUsage';
        } else if (energy.currentElectricPrice > 5 && energy.currentElectricPrice <= 13) {
            currentPriceStyle = 'okUsage';
        } else {
            currentPriceStyle = 'doUse';
        }

        card = (
            <CardContent>
                {/*<CardActionArea component={RouterLink} to="/questions">*/}
                <header className='top'>
                    <Typography variant="body2" component="div">{energy.alertMessage}</Typography>
                    <Typography variant="body2" component="div">{energy.timestamp}</Typography>
                </header>
                <main>
                    <div className='top'>
                        <Typography variant="h4" component="div" className={currentPriceStyle} gutterBottom>
                            Current Price: {energy.currentElectricPrice}p
                            <BoltIcon color="secondary" fontSize="large" sx={{position: 'relative', top: '8px'}}/>
                        </Typography>
                        <Divider variant="middle" component="div"/>
                        <Typography variant="h5" component="div" gutterBottom>
                            Today's Gas Price: {energy.todaysGasPrice}p <LocalFireDepartmentIcon color="secondary"
                                                                                                 fontSize="large"
                                                                                                 sx={{
                                                                                                     position: 'relative',
                                                                                                     top: '8px'
                                                                                                 }}/>
                        </Typography>
                    </div>
                    <div className='sub'>
                        <Typography variant="body1" component="div" gutterBottom>The next 3 hours</Typography>
                        {nextThreeHours}
                    </div>
                </main>
                {/*</CardActionArea>*/}
            </CardContent>
        );
    }

    return (
        <Card raised={true} sx={{width: 450, height: 240}} className='OctopusCard'>
            {card}
        </Card>
    );
}


export default OctopusCard;