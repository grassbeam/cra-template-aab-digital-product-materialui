import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";

const Error404Page = React.lazy(() => import('pages/error/404/Error404.Container'));


export default function RouterBoundaries(props) {
    return(
        <React.Suspense fallback={ props.SuspenseLoader }>
            <Switch>
                { props.children??"" }
                <Route path="*" component={Error404Page} />
            </Switch>
        </React.Suspense>
    )
}


RouterBoundaries.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    SuspenseLoder: PropTypes.element.isRequired,
}
