import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    textTitle : {
        fontSize : "15px",
        fontWeight : "bold",
        lineHeight : "150%",
        margin : "16px 0 8px 0"
    },
    textDesc : {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14.05px",
        lineHeight: "150%",
        width : "100%",
        textAlign: "center"
    },
    btnAction :{
        backgroundColor : "#005baa",
        borderRadius : "4px",
        position : "fixed",
        width: "90%",
        height: "56px",
        bottom: "32px",
        margin : "auto 0"
    },
    textAction : {
        color : "#ffffff",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
        textAlign: "center",
        letterSpacing: "0.04em",
        textTransform: "uppercase"
    }
});

const ErrorNetwork = (props) => {

    return(
        <h1>Network Error!</h1>
    );
};

export default withStyles(styles, { isWithTheme: true})(ErrorNetwork);