import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));



export default function HeaderDefault ({ TitleText, BackgroundColor, ...others }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: BackgroundColor, boxShadow:"none"}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        { TitleText }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

HeaderDefault.propTypes = {
    /**
     * Title header on AppBar
     */
    TitleText: PropTypes.string.isRequired,
    /**
     * Color string for AppBar background
     */
    BackgroundColor: PropTypes.string,
}

HeaderDefault.defaultProps = {
    BackgroundColor: '#00bed2',
}