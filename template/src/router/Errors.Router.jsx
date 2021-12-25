import React from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import MainLoader from 'components/loaders/main/MainLoader.Component';
import RouterBoundaries from 'components/boundaries/router/RouterBoundaries.Component';

const Error404 = React.lazy(() => import('pages/error/404/Error404.Container'));
const Error500 = React.lazy(() => import('pages/error/500/Error500.Container'));
const ErrorNetWork = React.lazy(() => import('pages/error/network/ErrorNetwork.Container'));


export default function ErrorsRouter() {
    let { path } = useRouteMatch();
    return(
        <RouterBoundaries SuspenseLoder={ <MainLoader isLoading={true} /> }>
            <Route exact path={`${path}/404`} component={Error404} />
            <Route exact path={`${path}/500`} component={Error500} />
            <Route exact path={`${path}/network`} component={ErrorNetWork} />
        </RouterBoundaries>
    );
}