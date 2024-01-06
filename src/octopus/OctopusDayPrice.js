import OctopusPriceList from "./OctopusPriceList";
import './OctopusDayPrice.css'
const OctopusDayPrice = props => {

  const dayPrices = props.dayPrices.halfHourPricesArr;
  let dayText = '';
  const today = new Date();
  const receivedDate = new Date(props.dayPrices.day);

  if (today.getDay() === receivedDate.getDay()) {
    dayText = "Today";
  } else {
    dayText = "Tomorrow";
  }

  return (
      <div className='OctopusDayPrice'>
        <OctopusPriceList dayPrices={dayPrices} header={dayText}></OctopusPriceList>
      </div>
  );
}

export default OctopusDayPrice;