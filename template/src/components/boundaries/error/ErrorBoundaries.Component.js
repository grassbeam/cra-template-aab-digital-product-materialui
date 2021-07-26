import React, { PureComponent, lazy } from "react";
import * as Sentry from '@sentry/browser';
import * as Config from 'utils/values/Config';
import { getCookie } from "utils/helpers/General";
import * as Log from 'utils/helpers/Logger';
import { ERROR_CODE_UNHANDLED_EXCEPTION } from 'utils/values/Errors';


const Error500Container = lazy(()=>import('pages/error/500/Error500.Component'));

export default class ErrorBoundariesComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { hasError: false , errorEventID: null, errorStack: null, errorInfo: null};
    }

    componentDidCatch(error, info) {
      // Display fallback on UI
      Log.error(error);

      // You can also log the error to an error reporting service
      Log.debugStr(`Using Sentry? = ${Config.IS_USING_SENTRY_LOG}`)
      if (Config.IS_USING_SENTRY_LOG) {
        Sentry.withScope((scope) => {
          scope.setUser({"id": getCookie("GHT_SESSION")});
          scope.setExtras(info);
          const errorEventID = Sentry.captureException(error);
          this.setState({errorEventID: errorEventID, hasError: true, errorStack: error, errorInfo: info });
        });
      } else {
        this.setState({errorEventID: null, hasError: true, errorStack: error, errorInfo: info });
      }
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (<Error500Container {...this.props} ErrorEventID={this.state.errorEventID} ErrorCodes={ERROR_CODE_UNHANDLED_EXCEPTION} ErrorObject={this.state.errorStack} />);
      }
      return this.props.children;
    }
}

