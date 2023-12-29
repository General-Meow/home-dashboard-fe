import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './normalize.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            errorElement: <ErrorPage/>
        },
        {
            path: "/home-dashboard/",
            element: <App/>,
            errorElement: <ErrorPage/>
        },
    ],
    {
        basename: "/home-dashboard/"
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
