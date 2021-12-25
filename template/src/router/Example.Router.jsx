import React from 'react';
import { Route, Routes } from "react-router-dom";

  
const HomeExample = React.lazy(() => import('pages/home/Home.Example.Container'));
const ExampleComponentPage = React.lazy(() => import('pages/example/Example.Container'));


function ExampleRouter() {
    return(
            <Routes>
                <Route exact path={"/"} element={ <HomeExample/> } />
                <Route path={`components`} element={ <ExampleComponentPage/> } />
            </Routes>
    );
}

export default ExampleRouter;