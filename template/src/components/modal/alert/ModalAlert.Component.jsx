import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as General from 'utils/helpers/General';

function ModalAlertComponent(props) {

  const { TitleText, TitleID, ContentText, ContentID, 
            OnClose, withBackdrop, isShowing,
            withLeftButton, LeftBtnText, OnClickLeftBtn, 
            RightBtnText, OnClickRightBtn, MaxWidthBreakDown }
        = props;
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(MaxWidthBreakDown));

  return (
    <Dialog
      open={isShowing}
      onClose={withBackdrop && OnClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen={fullScreen}
    >
        {
            !General.isNullOrEmpty(TitleText) && 
            <DialogTitle id={TitleID}>{ TitleText }</DialogTitle>
        }
        <DialogContent>
            <DialogContentText id={ContentID}>{ ContentText }</DialogContentText>
            </DialogContent>
        <DialogActions>
        {
            withLeftButton &&
            
            <Button onClick={OnClickLeftBtn} color="primary">
                {LeftBtnText}
            </Button>
        }
        <Button onClick={OnClickRightBtn} color="primary" autoFocus>
            {RightBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalAlertComponent.propTypes = {
    /**
     * Text of Modal Title
     */
    TitleText: PropTypes.string, 
    /**
     * ID Modal Title
     */
    TitleID: PropTypes.string, 
    /**
     * Content Text
     */
    ContentText: PropTypes.string.isRequired, 
    /**
     * ID on DialogContentText
     */
    ContentID: PropTypes.string.isRequired, 
    /**
     * if declared, will allow the modal to closed on click outside
     */
    withBackdrop: PropTypes.bool,
    /**
     * Backdrop closing function
     */
    OnClose: PropTypes.func, 
    /**
     * if declared, will show left button with Default / Declared value
     */
    withLeftButton: PropTypes.bool, 
    /**
     * value of text Left Button
     */
    LeftBtnText: PropTypes.string, 
    /**
     * Handler function click Left Button
     */
    OnClickLeftBtn: PropTypes.func, 
    /**
     * value of text Right Button
     */
    RightBtnText: PropTypes.string.isRequired, 
    /**
     * Handler function click Right Button
     */
    OnClickRightBtn: PropTypes.func.isRequired,
    /**
     * Max width size, value must be 'xs', 'sm',' md', 'lg', 'xl'
     */
     MaxWidthBreakDown: PropTypes.oneOf(['xs', 'sm',' md', 'lg', 'xl']),
};

ModalAlertComponent.defaultProps = {
    TitleText: "", 
    TitleID: "alert-dialog-title", 
    ContentID: "alert-dialog-description",
    withBackdrop: false,
    OnClose: (()=>{}), 
    withLeftButton: false, 
    RightBtnText: "OK", 
    OnClickRightBtn: ()=>{},
    MaxWidthBreakDown: "md",
};

export default ModalAlertComponent;