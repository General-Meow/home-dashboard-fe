import {Link, matchPath, Router, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import {Box} from "@mui/material";


Router.propTypes = {
    children: PropTypes.node,
};
function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function Navigation() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/', '/octopus-details', '/trash']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={currentTab}>
                <Tab label="Home" value="/" to="/" component={Link} />
                <Tab label="Octopus" value="/octopus-details" to="/octopus-details" component={Link} />
                <Tab label="Travel" value="/travel" to="/travel" component={Link} />
                <Tab label="Weather" value="/weather" to="/weather" component={Link} />
                <Tab label="Solar" value="/solar" to="/solar" component={Link} />
            </Tabs>
        </Box>
    );
}

export default Navigation;
