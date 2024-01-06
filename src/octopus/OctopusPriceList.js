import './OctopusPriceList.css';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const parseMintutes = function (minutes) {
    if (minutes === 0) {
        return '00';
    }
    return minutes;
}

const parseHours = function (hours) {
    if (hours < 10) {
        return `0${hours}`;
    }
    return hours;
}

const octopusPriceList = props => {

    let prices;
    let foundNow = false;
    if (props.dayPrices === undefined || props.dayPrices.length === 0) {
        return (
            <div>No prices, please check later</div>
        );
    }
    prices = props.dayPrices
        // .filter(element => {
        //   const fromPriceDate = new Date(element.fromDateTime);
        //   return now < fromPriceDate;
        // })
        .map((element, index) => {
            const price = Math.round(element.price * 100) / 100;
            const fromDate = new Date(element.fromDateTime);
            const fromDateStr = `${parseHours(fromDate.getUTCHours())}:${parseMintutes(fromDate.getUTCMinutes())}`
            const toDate = new Date(element.toDateTime);
            const toDateStr = `${parseHours(toDate.getUTCHours())}:${parseMintutes(toDate.getUTCMinutes())}`;
            const liIndex = `octoList-${index}`
            let rowStyle = '';
            if (price < 15) {
                rowStyle = "green";
            } else if (price < 20) {
                rowStyle = "lightOrange";
            } else if (price < 25) {
                rowStyle = "orange";
            } else if (price < 35) {
                rowStyle = "darkOrange";
            } else {
                rowStyle = "red";
            }
            const now = new Date();
            const fromPriceDate = new Date(element.fromDateTime);
            const toPriceDate = new Date(element.toDateTime);
            if ((!foundNow) && (fromPriceDate <= now) && (now <= toPriceDate)) {
                rowStyle = rowStyle + ' now';
                foundNow = true;
            }

            return (
                <TableRow key={liIndex} className={rowStyle}>
                    <TableCell>{fromDateStr}-{toDateStr}</TableCell>
                    <TableCell>{price}p</TableCell>
                </TableRow>
            )
        })

    return (
        <div className='OctopusPriceList'>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>{props.header}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prices}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
        ;
}

export default octopusPriceList;