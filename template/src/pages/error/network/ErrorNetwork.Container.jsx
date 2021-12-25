import React from 'react';
import { Grid } from '@mui/material';
import ErrorNetworkComp from "./ErrorNetwork.Component";
import withDefaultContainer from 'components/high-order/withDefaultContainer';

class ErrorNetworkContainer extends React.Component {
    
    componentDidMount() {
        // Do log some analytics here
    }

    render() {
        return <>
            <Grid 
                container 
                justifyContent="center" 
                alignItems="center" 
                sx={{ textAlign: "center", }}
            >
                <ErrorNetworkComp />
            </Grid>
        </>;
    }
}


export default withDefaultContainer("Error Network Found", "", false,{backgroundColor :"#ffffff",containerMinHeight : "100vh" })(ErrorNetworkContainer);