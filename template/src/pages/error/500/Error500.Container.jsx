import React from 'react';
import PropTypes from 'prop-types';
import Error500Comp from "./Error500.Component";

class Error500Container extends React.Component {
    
    componentDidMount() {
        // Do log some analytics here
    }

    render() {
        return(
            <>
                <Error500Comp {...this.props} />
            </>
        );
    }
}


export default Error500Container;

Error500Container.propTypes = {
    ErrorCodes: PropTypes.string,
    ErrorObject: PropTypes.object,
};