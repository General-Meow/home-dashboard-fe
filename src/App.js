import logo from './logo.svg';
import './App.css';
import OctopusDashboard from './octopus/OctopusDashboard'
import TubeDashboard from './travel/TubeDashboard'
import WeatherDashboard from './weather/WeatherDashboard'

function App() {
    return (
        <div className="App">
            <header><h1>Home dashboard</h1></header>
            <main>
                <OctopusDashboard/>
                <TubeDashboard/>
                <WeatherDashboard/>
            </main>
        </div>
    );
}

export default App;
