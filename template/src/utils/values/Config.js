/** 
 * For configuration value, example: API URL, API KEY, etc...
*/
export const APP_BUILD_NAME = process.env.REACT_APP_BUILD_NAME;
export const APP_NAME = process.env.REACT_APP_NAME;
export const APP_BUILD_VERSION = process.env.REACT_APP_VERSION;
export const APP_REDUX_VERSION = 1;

export const IS_DEBUG =  process.env.NODE_ENV === 'development';

export const REDUX_ENCRYPT_SALT = process.env.REACT_APP_ENCRYPT_SALT;

export const IS_USING_GOOGLE_ANALYTICS = process.env.REACT_APP_GOOGLE_ANALYTICS_IS_ACTIVE === "1";
export const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

export const IS_USING_SENTRY_LOG = process.env.REACT_APP_SENTRY_IS_ACTIVE === "1";
export const LOG_SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const LOG_SENTRY_PROJECT = process.env.REACT_APP_SENTRY_PROJECT;
export const LOG_SENTRY_TRANSACTION_ID = Math.random().toString(36).substr(2, 9);

export const IS_USING_EGMON_RUM_ANALYTICS = process.env.REACT_APP_EGMON_IS_ACTIVE === "1";



