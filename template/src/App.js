import React from "react";
import 'assets/styles/css/App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import ExampleRouter from 'router/Example.Router';
import MainLoader from 'components/loaders/main/MainLoader.Component';

const HomeContainer = React.lazy(() => import('./pages/home/Home.Container'));

class App extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
        
          <React.Suspense fallback={
              <MainLoader isLoading={true} />
          }>
            <Switch>
                <Route exact path="/" >
                  <HomeContainer/>
                </Route>
                <Route path="/example">
                  <ExampleRouter/>
                </Route>
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
