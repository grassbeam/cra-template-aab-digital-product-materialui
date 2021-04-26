/** 
 * For configuration value, example: API URL, API KEY, etc...
*/

export const APP_BUILD_VERSION = process.env.REACT_APP_VERSION
export const APP_BUILD_NAME = process.env.REACT_APP_BUILD_NAME

export const IS_DEBUG =  process.env.NODE_ENV === 'development';


export const API_URL = process.env.REACT_APP_API_URL;