import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

  
const HomeExample = React.lazy(() => import('pages/home/Home.Example.Container'));
const ExampleComponentPage = React.lazy(() => import('pages/example/Example.Container'));


function ExampleRouter() {
    let { path } = useRouteMatch();
    return(
        <Switch>
            <Route exact path={path} component={HomeExample} />
            <Route path={`${path}/components`} component={ExampleComponentPage} />
        </Switch>
    );
}

export default ExampleRouter;