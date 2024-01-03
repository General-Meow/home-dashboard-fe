import {Link} from "react-router-dom";

const OctopusDetails = props => {
    return (
        <div>
            <h1>Octopus Details</h1>
            <h4>
                <Link to={`/`}>Back to dashboard</Link>
            </h4>
        </div>
    )
}

export default OctopusDetails;