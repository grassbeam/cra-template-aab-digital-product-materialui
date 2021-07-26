import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
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
function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  Config.IS_USING_GOOGLE_ANALYTICS && ReactGA.ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
    // Use `sendBeacon()` if the browser supports it.
    transport: 'beacon',

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}
reportWebVitals(sendToGoogleAnalytics);
