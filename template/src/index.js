import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import reportWebVitals from './reportWebVitals';
// import { GoogleAnalytics } from 'utils/helpers/Analytics';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

import App from './App';
import { store, persistor } from './app/Store';
import * as Config from 'utils/values/Config';

Config.IS_USING_GOOGLE_ANALYTICS && ReactGA.initialize(Config.GOOGLE_ANALYTICS_ID);

Config.IS_USING_SENTRY_LOG && Sentry.init({
  dsn: Config.LOG_SENTRY_DSN, 
  // release: Config.LOG_SENTRY_PROJECT+ '@' + Config.APP_BUILD_VERSION,
  release: `${Config.LOG_SENTRY_PROJECT}@${Config.APP_BUILD_VERSION}-build:${process.env.REACT_APP_JENKINS_BUILD_NUMBER??"00"}`,
  environment: Config.APP_BUILD_NAME
});

Config.IS_USING_SENTRY_LOG && Sentry.setTags({ "transaction_id": Config.LOG_SENTRY_TRANSACTION_ID });

ReactDOM.render(
  <React.StrictMode>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(GoogleAnalytics.WebVitals);
