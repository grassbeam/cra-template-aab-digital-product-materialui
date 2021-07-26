/**
 * Error Type
 */

 export const TYPE_ERROR = {
    GENERIC: 1, // Showing Error 500 Component
    INVALID_RESPONSE_API: 2,
    CONNECTION: 3,

}



/**
 * Errors Code value to show on Error pages
 */


export const ERROR_API_UNHANDLED_EXCEPTION = "UNHANDLED_RESPONSE";
export const ERROR_API_INTERNAL_SERVER_ERROR = "500 INTERNAL_SERVER_ERROR"; // Status = false with exception or error
export const ERROR_API_REQUEST_TIMEOUT = "REQUEST_TIMEOUT"; // timeout, handle later
export const ERROR_API_INVALID_DATA = "INVALID_DATA"; // Data not found or anything related to database without exception
export const ERROR_API_CONNECTION = "CONNECTION_PROBLEMS";

export const ERROR_CODE_UNHANDLED_EXCEPTION = "500 UNHANDLED_EXCEPTION_OCCURS"
export const ERROR_NOT_FOUND = "404 PAGE_NOT_FOUND";
export const ERROR_INVALID_AUTH = "401 INVALID_AUTHORIZATION";


export function GenerateErrorCode(errMsg, errorObject) {
    const { ErrorCode } = errorObject??{};
    return errMsg + ((ErrorCode === null || ErrorCode === "")?"" : `(${ErrorCode})`);
}
