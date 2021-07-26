import React from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import MainLoader from 'components/loaders/main/MainLoader.Component';
import RouterBoundaries from 'components/boundaries/router/RouterBoundaries.Component';

  
const HomeExample = React.lazy(() => import('pages/home/Home.Example.Container'));
const ExampleComponentPage = React.lazy(() => import('pages/example/Example.Container'));


function ExampleRouter() {
    let { path } = useRouteMatch();
    return(
        <RouterBoundaries SuspenseLoder={ <MainLoader isLoading={true} /> }>
            <Route exact path={path} component={HomeExample} />
            <Route path={`${path}/components`} component={ExampleComponentPage} />
        </RouterBoundaries>
    );
}

export default ExampleRouter;