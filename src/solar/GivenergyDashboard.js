const GivenergyDashboard = props => {

  return (
    <div className='GivenergyDashboard'>
      <h2>Solar</h2>
      <table>
        <tbody>
          <tr>
            <td>Solar</td>
            <td>100w</td>
          </tr>
          <tr>
            <td>Import</td>
            <td>1000w</td>
          </tr>
          <tr>
            <td>Export</td>
            <td>0w</td>
          </tr>
          <tr>
            <td>House use</td>
            <td>0w</td>
          </tr>
          <tr>
            <td>Battery use</td>
            <td>0w</td>
          </tr>
          <tr>
            <td>Battery level</td>
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GivenergyDashboard;