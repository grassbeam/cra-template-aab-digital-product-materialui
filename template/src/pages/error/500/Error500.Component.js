import React from 'react';
import PropTypes from 'prop-types';
import * as Errors from "utils/values/Errors";
import withDefaultContainer from 'components/high-order/withDefaultContainer';

const Error500 = (props) =>  {
    return(
        <h1>ERROR 500 - UNHANDLED EXCEPTION</h1>
    );
};

export default withDefaultContainer("Error Server Found","", false,{
    backgroundColor :"#ffffff",
    containerMinHeight : "100vh"
})(Error500);

Error500.propTypes = {
    ErrorCodes: PropTypes.string,
    ErrorObject: PropTypes.object,
};

Error500.defaultProps = {
    ErrorCodes: Errors.ERROR_API_INTERNAL_SERVER_ERROR,
}