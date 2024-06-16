import './TravelCard.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const TravelCard = ({travelData}) => {

    let card = (
        <CardContent></CardContent>
    );

    if(travelData !== undefined) {

        let busRoutes = travelData.busRouteArr.map(route => {
            return (
                <ListItem disablePadding>
                    <ListItemText sx={{margin: 0}}>
                        <Typography variant="body2" component="div" className='busRouteDescription'>
                            {route.routeNumber} from {route.routeFrom} to {route.routeTo}</Typography>
                        <Typography variant="body2" component="div" className='busRouteTime' sx={{textAlign: 'center'}}>
                            {route.nextBusTimesArr.map(element => element.busAtTimeInMinutes)
                                .sort((a, b) => a - b ).map(busAtTimeInMinutes => `${busAtTimeInMinutes}, `)}
                        </Typography>
                    </ListItemText>
                </ListItem>
            );
        });

        let trainRoutes = travelData.trainRouteArr
            .filter(route => route.isUnderground)
            .filter(route => !route.statusOk)
            .slice(0, 3).map(route => {
            return (
                <ListItem disablePadding className='tube'>
                    <ListItemText className={route.lineName.toLowerCase()} sx={{margin: 0}}>{route.lineName}</ListItemText>
                </ListItem>
            );
        });

        if(travelData.trainRouteArr.filter(route => !route.statusOk).length > 3) {
            trainRoutes.push(
                <ListItem disablePadding className='tube'>
                    <ListItemText className='moreIssues' sx={{margin: 0}}>More issues on other lines</ListItemText>
                </ListItem>
            );
        } else {
            trainRoutes.push(
                <ListItem disablePadding className='tube'>
                    <ListItemText className='othersGood' sx={{margin: 0}}>All other lines ok</ListItemText>
                </ListItem>
            );
        }

        let overgroundTimes = travelData.trainRouteArr
            .filter(route => !route.isUnderground)
            .filter(route => route.lineName === 'London Overground')
            .flatMap(route => route.nextTimesArr)
            .flat()
            .map(time => new Date(time))
            .filter(time => {
                const now = new Date();
                return time > now;
            })
            .slice(0, 2)
            .map(time => `${time.toLocaleTimeString()}`);
        ;

        console.log('chicken', overgroundTimes);

        let overground = travelData.trainRouteArr
            .filter(route => !route.isUnderground)
            .filter(route => route.lineName === 'London Overground')
            .map(route => (
                <ListItem disablePadding>
                    <ListItemText className='overground' sx={{margin: 0}}>
                        <Typography variant="body2" component="div">{route.lineName} From New cross to Canada Water</Typography>
                        <Typography variant="body2" component="div" sx={{textAlign: 'center'}}>
                            {overgroundTimes.map(time => `${time} `)}
                        </Typography>
                    </ListItemText>
                </ListItem>
                )
            );


        card = (
            <CardContent>
                <header className='top'>
                    <Typography variant="body2" component="div" align="right">{travelData.timestamp}</Typography>
                </header>
                <main>
                    <section className='left busses'>
                        <Typography variant="h6" component="div" gutterBottom>Buses</Typography>
                        <div>
                            <List dense disablePadding>
                                {busRoutes}
                            </List>
                        </div>
                    </section>
                    <Divider variant="middle" orientation="vertical" component="div"/>
                    <section className='right trains'>
                        <Typography variant="h6" component="div" gutterBottom>Trains</Typography>
                        <div>
                            <List dense disablePadding>
                                {trainRoutes}
                            </List>
                        </div>
                        <footer>
                            <div className='route train'>
                                <List dense disablePadding>
                                    {overground}
                                </List>
                            </div>
                        </footer>
                    </section>
                </main>

            </CardContent>
        );
    }

    return (
        <Card raised={true} sx={{width: 450, height: 240}} className='TravelCard'>{card}</Card>
    );
}


export default TravelCard;