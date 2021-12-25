import React from "react";
import 'assets/styles/css/index.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ErrorBoundariesComponent from 'components/boundaries/error/ErrorBoundaries.Component';
import ExampleRouter from 'router/Example.Router';
import ErrorsRouter from 'router/Errors.Router';
import MainLoader from 'components/loaders/main/MainLoader.Component';

const Error404Page = React.lazy(() => import('pages/error/404/Error404.Container'));
const HomeContainer = React.lazy(() => import('./pages/home/Home.Container'));

const App = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense fallback={
            <MainLoader isLoading={true} />
        }>
          <ErrorBoundariesComponent>
            <Routes>
                <Route exact path="/" element={ <HomeContainer/> } />
                <Route path="errors/*" element={ <ErrorsRouter/> } />
                <Route path="example/*" element={ <ExampleRouter/> } />
                <Route path="*" element={ <Error404Page /> } />
            </Routes>
          </ErrorBoundariesComponent>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
