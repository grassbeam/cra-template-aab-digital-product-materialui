import React from 'react';
import PropTypes from 'prop-types';
import { Routes , Route } from "react-router-dom";

const Error404Page = React.lazy(() => import('pages/error/404/Error404.Container'));


export default function RouterBoundaries(props) {
    return(
        <React.Suspense fallback={ props.SuspenseLoader }>
            <Routes>
                { props.children??"" }
                <Route path="*" component={Error404Page} />
            </Routes>
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
