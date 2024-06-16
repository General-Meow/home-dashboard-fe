import './SolarCard.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {ListItemIcon} from "@mui/material";
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import HomeIcon from '@mui/icons-material/Home';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import LightModeIcon from '@mui/icons-material/LightMode';

const SolarCard = ({solarData}) => {

    function getIcon(iconName) {
        if (iconName === 'Panel') {
            return <SolarPowerIcon/>
        } else if (iconName === 'Home') {
            return <HomeIcon/>
        } else if (iconName === 'Battery') {
            return <span><BatteryChargingFullIcon/></span>
        } else if (iconName === 'Predicted') {
            return <LightModeIcon/>
        }
        return undefined;
    }

    let card = (
        <CardContent>
        </CardContent>
    );

    if (solarData !== undefined) {

        let entries = solarData.entries.entryArr
            .map(entry => {
                return (
                    <ListItem>
                        <ListItemIcon>{getIcon(entry.type)}</ListItemIcon>
                        <ListItemText>{entry.description}: {entry.amount}{entry.unit}</ListItemText>
                    </ListItem>
                );
            });

        card = (
            <CardContent>
                <header className='top'>
                    <Typography variant="body2" component="div" align="right">{solarData.timestamp}</Typography>
                </header>
                <main>
                    <List>
                        {entries}
                    </List>

                    <div className='data'>Generating: 2.1Kwh</div>
                    <div className='data'>House Usage: 300Wh</div>
                    <div className='data'>Battery Percentage: 40%</div>
                    <div className='data'>Predicted Generation: 8Kwh</div>
                </main>
                <footer>footer</footer>
            </CardContent>
        );
    }

    return (
        <Card raised={true} sx={{width: 450, height: 240}} className='SolarCard'>{card}</Card>
    );
}


export default SolarCard;