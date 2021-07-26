import React, { lazy }  from 'react';
import PropTypes from 'prop-types';
import { TYPE_ERROR, } from 'utils/values/Errors';

const ErrorNetworkContainer = lazy(()=>import('pages/error/network/ErrorNetwork.Container'));
const Error500Container = lazy(()=>import('pages/error/500/Error500.Component'));


const DefaultContainerErrorHandler = ({ ErrorStatus, ErrorCodes, ErrorObject }) => {
    switch(ErrorStatus) {
      case TYPE_ERROR.GENERIC:
      case TYPE_ERROR.INVALID_RESPONSE_API:
        return(
          <Error500Container ErrorCodes={ErrorCodes} ErrorObject={ErrorObject} />
        );
  
      case TYPE_ERROR.CONNECTION:
        return (
          <ErrorNetworkContainer ErrorCodes={ErrorCodes} ErrorObject={ErrorObject} />
        );
        
      default :
          return "";
    }
  }

export default DefaultContainerErrorHandler;


DefaultContainerErrorHandler.propTypes = {
    ErrorStatus: PropTypes.number.isRequired,
    ErrorCodes: PropTypes.string.isRequired,
    ErrorObject: PropTypes.object,
};
