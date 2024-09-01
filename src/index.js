import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './normalize.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {App, loader as rootLoader, action as rootAction} from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import OctopusDetails from "./octopus/OctopusDetails";
import SolarDetails from "./solar/SolarDetails";
import TravelDetails from "./travel/TravelDetails";
import WeatherCard from "./weather/WeatherCard";
import {loader as octopusLoader} from './octopus/OctopusDetails';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            errorElement: <ErrorPage/>,
            loader: rootLoader,
            action: rootAction,
        },
        {
            path: "octopus-details",
            element: <OctopusDetails/>,
            loader: octopusLoader,

        },
        {
            path: "travel-details",
            element: <TravelDetails/>
        },
        {
            path: "weather-details",
            element: <WeatherCard/>
        },
        {
            path: "solar-details",
            element: <SolarDetails/>,
        },

    ],
    {
        basename: "/home-dashboard"
    }
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
