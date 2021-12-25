import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.info.main,
  },
}));


function MainLoader(props) {

    const { isLoading, onClose, className, } = props;
    const classes = useStyles();

    return(
        <Backdrop className={`${className} ${classes.backdrop}`} open={isLoading} onClick={onClose}>
          <CircularProgress  color="inherit" />
        </Backdrop>
    );

}

MainLoader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ])
}

MainLoader.defaultProps = {
    onClose: ()=>{},
    className: "",
}

export default MainLoader;