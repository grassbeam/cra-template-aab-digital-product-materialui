import React from "react";
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

class App extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
        
          <React.Suspense fallback={
              <MainLoader isLoading={true} />
          }>
            <ErrorBoundariesComponent>
              <Routes>
                  <Route exact path="/" >
                    <HomeContainer/>
                  </Route>
                    <Route path="/errors">
                      <ErrorsRouter/>
                    </Route>
                  <Route path="/example">
                    <ExampleRouter/>
                  </Route>
                  <Route path="*">
                    <Error404Page />
                  </Route>
              </Routes>
            </ErrorBoundariesComponent>
          </React.Suspense>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
