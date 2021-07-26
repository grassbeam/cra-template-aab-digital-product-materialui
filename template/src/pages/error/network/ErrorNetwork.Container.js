import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ErrorNetworkComp from "./ErrorNetwork.Component";
import withDefaultContainer from 'components/high-order/withDefaultContainer';

const styles = (theme) => ({
    root: {
        textAlign: "center"
    }
})

class ErrorNetworkContainer extends React.Component {
    
    componentDidMount() {
        // Do log some analytics here
    }

    render() {
        return(
            <>
                <Grid 
                    container 
                    justify="center" 
                    alignItems="center" 
                    className={this.props.classes.root}
                >
                    <ErrorNetworkComp />
                </Grid>
            </>
        );
    }
}


export default withDefaultContainer("Error Network Found", "", false,{backgroundColor :"#ffffff",containerMinHeight : "100vh" })(withStyles(styles, { isWithTheme: true})(ErrorNetworkContainer));