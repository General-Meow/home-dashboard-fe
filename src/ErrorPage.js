import errorImage from './img.png';
import Typography from "@mui/material/Typography";
import './ErrorPage.css';
import {useRouteError} from "react-router";

const ErrorPage = props => {
    let errorObj = useRouteError();
    console.error("chicken: ", errorObj);

    let errorMessage = { message : 'not sure what happened' };

    if (errorObj.error && errorObj.error.message) {
        errorMessage = errorObj.error.message;
    } else if(errorObj instanceof Error) {
        errorMessage.message = errorObj.message;
        errorMessage.name = errorObj.name;
        errorMessage.stack = JSON.stringify(errorObj.stack);
    }

    errorMessage = JSON.stringify(errorMessage);

    return (
        <div class='ErrorComponent'>
            <Typography variant="h3" component="div" className='errorHeader'>
                Uhoh, something broke
            </Typography>
            <main>
                <span class='element'>
                    <img src={errorImage} alt='error image' className='errorImage'/>
                </span>
                <span class='element'>
                    {errorMessage}
                </span>
            </main>

        </div>
    )
}
export default ErrorPage;