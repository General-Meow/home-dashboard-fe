import OctopusPriceList from "./OctopusPriceList";
import './OctopusDayPrice.css'
const OctopusDayPrice = props => {

  const dayPrices = props.dayPrices.halfHourPricesArr;
  let dayText = '';
  const today = new Date();
  const receivedDate = new Date(props.dayPrices.day);

  if (today.getDay() === receivedDate.getDay()) {
    dayText = "Today";
  } else if (receivedDate.getDay() === today.getDay() + 1) {
    dayText = "Tomorrow";
  }

  return (
      <div className='OctopusDayPrice'>
        <h3>{dayText}</h3>
        <OctopusPriceList dayPrices={dayPrices}></OctopusPriceList>
      </div>
  );
}

export default OctopusDayPrice;