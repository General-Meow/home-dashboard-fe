import {useEffect, useState} from "react";
import axios from "axios";

const GivenergyDashboard = props => {

  let solarUrl = 'http://hoangfamily123.tplinkdns.com/home-dashboard/service/solar-flow';

  if(document.location.host.indexOf('localhost') >= 0) {
    solarUrl = 'http://localhost:3000/solar-flow';
  }

  const [solarUsage, setSolarUsage] = useState([])
  const [state, setState] = useState([]);

  const initState = function () {
    axios.get(solarUrl)
        .then(response => {
          setSolarUsage(response.data);
        })
        .catch(error => console.error('Solar error: ', error));
  }


  useEffect(() => {
    initState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const resetState = function () {
    setState(new Date());
  }

  const THIRTY_SECONDS = 30000;
  setInterval(resetState, THIRTY_SECONDS);


  return (
    <div className='GivenergyDashboard'>
      <h2>Solar</h2>
      <table>
        <tbody>
        <tr>
          <td colSpan={2}></td>
          <td>{solarUsage.asOf}</td>
        </tr>
        <tr>
          <td>Solar to home</td>
          <td>{solarUsage.solarToHouse}</td>
        </tr>
          <tr>
            <td>Solar to battery</td>
            <td>{solarUsage.solarToBattery}</td>
          </tr>
          <tr>
            <td>Import to home</td>
            <td>{solarUsage.gridToHouse}</td>
          </tr>
          <tr>
            <td>Import to battery</td>
            <td>{solarUsage.gridToBattery}</td>
          </tr>

          <tr>
            <td>Export from solar</td>
            <td>{solarUsage.solarToGrid}</td>
          </tr>

          <tr>
            <td>Export from battery</td>
            <td>{solarUsage.batteryToGrid}</td>
          </tr>
          <tr>
            <td>Battery level</td>
            <td>{solarUsage.batteryChargeLevel}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GivenergyDashboard;