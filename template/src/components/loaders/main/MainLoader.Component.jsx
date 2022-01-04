import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function MainLoader(props) {

    const { isLoading, onClose, sx, } = props;

    return(
        <Backdrop sx={(theme)=> ({ zIndex: 999, color: theme.palette && theme.palette.info && theme.palette.info.main || 'blue', ...sx, })} open={isLoading} onClick={onClose}>
          <CircularProgress  color="inherit" />
        </Backdrop>
    );

}

MainLoader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    sx: PropTypes.object,
}

MainLoader.defaultProps = {
    onClose: ()=>{},
    sx: {},
}

export default MainLoader;