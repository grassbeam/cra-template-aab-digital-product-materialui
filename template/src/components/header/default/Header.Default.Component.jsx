import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function HeaderDefault ({ TitleText, BackgroundColor, ...others }) {

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{ backgroundColor: BackgroundColor, boxShadow:"none", }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, }}>
                        { TitleText }
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
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