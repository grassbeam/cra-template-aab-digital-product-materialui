import * as Config from "utils/values/Config";
import * as Sentry from '@sentry/react';
import * as Util from 'utils/helpers/General';

function ResultErrorFetchAPI(message, route, response = null, error = null) {
    var instance = new Error(message);
    instance.route = route;
    instance.response = response;
    instance.name = 'ResultErrorFetchAPI';
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
      Error.captureStackTrace((error == null ? instance : error), ResultErrorFetchAPI);
    }
    return instance;
}

ResultErrorFetchAPI.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
});

if (Object.setPrototypeOf){
    Object.setPrototypeOf(ResultErrorFetchAPI, Error);
} else {
    ResultErrorFetchAPI.__proto__ = Error;
}

export const ERROR_TYPE = {
    HTTP_STATUS: "Error Request Status HTTP",
    JSON_STATUS: "Error Request Status JSON is false",
    JSON_DATA_EMPTY: "Error Request JSON Data is null or empty",
    HTTP_NORESPONSE: "Error Request returned with NO HTTP Response",
    RESPONSE_UNEXPECTED: "Error Request with Unexpected turn of Result"
}

/**
 * 
 * @param {String} str 
 */
function debugStr(str) {
    if(Config.IS_DEBUG) {
      console.log("%c" + str, 'background: #222; color: #bada55');
    }
}

/**
 * 
 * @param {string} groupTitle 
 * @param {*} items 
 */
export function debugGroupCollapsed(groupTitle,items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, true);
}
  
export function debugGroup(groupTitle, items) {
    if(Config.IS_DEBUG)
      debugGroupExpandCollapsed(groupTitle, items, false);
}
  
export function debugGroupExpandCollapsed(groupTitle, items, isCollapsed) {
    const IS_DEBUG = Config.IS_DEBUG;
    if(IS_DEBUG) {
      isCollapsed? console.groupCollapsed(groupTitle) : console.group(groupTitle);
      if (items instanceof Array) {
        items.map((items, index) => {
          if (items instanceof Object) {
            debugGroupExpandCollapsed("["+index+"] :", items, true);
          } else {
            debugStr(items)
          }
          return 0;
        });
      } else if (typeof items == 'object') {
        for (var key in items) {
          if(items[key] instanceof Object || items[key] instanceof Array) {
            debugGroupExpandCollapsed(key+ ": ", items[key], true);
          } else {
            debugStr(key+": " + items[key]);
          }
        }
      }  else if (typeof items == 'function') {
        debugStr("Function: " + (items.name || "Annonymous function"));
      } else {
        debugStr(items);
      }
      console.groupEnd();
    }
}
  
export function error(msg, exception) {
    if (exception !== null && exception !== undefined) {
      if (exception.message !== null && exception.message !== undefined
        && exception.name !== null && exception.name !== undefined
        && exception.stack !== null && exception.stack !== undefined) {
        console.group("%c"+msg+exception.name + ": " + exception.message, "color: #ffebee, background: #c62828");
        console.error(exception.stack);
        console.groupEnd();
      } else {
        console.error(msg);
      }
    } else {
      console.error(msg);
    }
}


export function errorAPI(route, error, user="Anonymous", resultJson="", response = null, sendToSentry = true) {
    if (!isErrorNetworkOnAxios(error)) {
        var additionalErrorObj = {};
        var errorObj = new ResultErrorFetchAPI(ERROR_TYPE.JSON_STATUS, route, resultJson);
      
        additionalErrorObj = generateAxiosCustomObjErrorAPI(error);
        errorObj = new ResultErrorFetchAPI(additionalErrorObj.Message? additionalErrorObj.Message : additionalErrorObj.AdditionalMessage, 
          route, additionalErrorObj.response, error);
    
        // writeExceptionToDB(route, user, error, resultJson, response)
        if(sendToSentry)
            reportSentry(errorObj, user, additionalErrorObj);
    }
  }


export function isErrorNetworkOnAxios(error) {
    if (!Util.isNullOrUndefined(error)) {
      if(error.response) {
        return false;
      } else if (error.request) {
        return true;
      }
    }
    return false;
}

function generateAxiosCustomObjErrorAPI(error) {
    var result = {ResponseObjType:"Axios"};
    if (typeof error == "string") {
      // Just Message
      result.Message = error;
    } else {
      result.Message = ERROR_TYPE.RESPONSE_UNEXPECTED;
      var response = null;
      var request = null;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        result.Message = ERROR_TYPE.HTTP_STATUS + (error.response.status?" Code: " + error.response.status: "");
        response = {};
        response.Data = error.response.data;
        response.Status = error.response.status;
        response.Headers = error.response.headers;
        if (error.request) {
          request = error.request;
        }
        result.FetchConfig = error.config;
        result.FetchData = {
          Response: response,
          Request: request,
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        result.Message = ERROR_TYPE.HTTP_NORESPONSE + "\n " + JSON.stringify(error);;
        request = error.request;
        result.FetchConfig = error.config;
        result.FetchData = {
          Response: response,
          Request: request,
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        result.AdditionalMessage = error.message;
        result.FetchConfig = error.config;
        result.FetchData = null;
      }
    }
    return result;
}


export function isReportingUserUsingEmail(email="") {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  
export function reportSentry(errorObj, reportingUser, additionalObj={}) {
    Sentry.configureScope(function(scope) {
      if (isReportingUserUsingEmail(reportingUser)) {
        scope.setUser({"email": reportingUser});
      } else {
        scope.setUser({"id": reportingUser});
      }
      scope.setExtras(additionalObj);
      Sentry.captureException(errorObj);
    });
  }


var EGRUM = window.EGRUM;


/**
 * 
 * @param {string} pageName = Page Name for EGMON reporting 
 */
export const EgMonPageStart = (pageName = "Unknown") => {
  if (typeof EGRUM !== 'undefined')
  {
    EGRUM.vPage('markVirtualPageStart');
    EGRUM.vPage('page', pageName);
    debugStr("EGRUM Start Reported");
  }
}

/**
 * 
 * @param {string} status = page status, only have option of 'success' and 'error'
 * @param {string} explanation = message for error reporting when navigated page is error (status = 'error')
 */
export const EgMonPageEnd = (status='success', explanation) => {
  if (typeof EGRUM !== 'undefined')
  {
    EGRUM.vPage('markVirtualPageEnd', {
      status: status,
      url: window.location.href,
      explanation: explanation
    });
    debugStr("EGRUM End Reported");
  }
}

export const EgMonMeta = (key, value) => {
  EGRUM && EGRUM.vPage('meta', key, value) && debugStr("EGRUM Meta Reported");
}

export const EgMonError = (err) => {
  EGRUM && EGRUM.onerror({
    message: err.message,
    filename: err.filename,
    lineNumber: err.lineNumber,
    columnNumber: err.columnNumber,
    stack: err.stack,
    meta: {type:"Internal Error."}
  });
  debugStr("EGRUM Error Reported");
}