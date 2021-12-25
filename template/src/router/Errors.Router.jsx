import React from 'react';
import { Routes, Route } from "react-router-dom";

const Error404 = React.lazy(() => import('pages/error/404/Error404.Container'));
const Error500 = React.lazy(() => import('pages/error/500/Error500.Container'));
const ErrorNetWork = React.lazy(() => import('pages/error/network/ErrorNetwork.Container'));


export default function ErrorsRouter() {
    return(
            <Routes>
                <Route exact path={`/404`} element={ <Error404/> } />
                <Route exact path={`/500`} component={ <Error500/> } />
                <Route exact path={`/network`} component={ <ErrorNetWork/> } />
            </Routes>
    );
}
