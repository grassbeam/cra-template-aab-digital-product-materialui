import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function MainLoader(props) {

    const { isLoading, onClose, sx, } = props;

    return(
        <Backdrop sx={(theme)=> ({ zIndex: theme.zIndex.drawer + 1, color: theme.palette.info.main, ...sx, })} open={isLoading} onClick={onClose}>
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