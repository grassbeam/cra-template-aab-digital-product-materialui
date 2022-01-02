import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as General from 'utils/helpers/General';

function ModalAlertComponent(props) {

  const { TitleText, TitleID, ContentText, ContentID, 
            OnClose, withBackdrop, isShowing,
            withLeftButton, LeftBtnText, LeftBtnColor, OnClickLeftBtn, 
            RightBtnText, RightBtnColor, OnClickRightBtn, MaxWidthBreakDown }
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
            
            <Button onClick={OnClickLeftBtn} color={LeftBtnColor}>
                {LeftBtnText}
            </Button>
        }
        <Button onClick={OnClickRightBtn} color={RightBtnColor} autoFocus>
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
     * value of Left Button color ["primary", "secondary", etc]
     */
    LeftBtnColor: PropTypes.string,
    /**
     * Handler function click Left Button
     */
    OnClickLeftBtn: PropTypes.func, 
    /**
     * value of text Right Button
     */
    RightBtnText: PropTypes.string.isRequired, 
    /**
     * value of Right Button color ["primary", "secondary", etc]
     */
    RightBtnColor: PropTypes.string,
    /**
     * Handler function click Right Button
     */
    OnClickRightBtn: PropTypes.func.isRequired,
    /**
     * Max width size, value must be 'xs', 'sm',' md', 'lg', 'xl'
     */
     MaxWidthBreakDown: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

ModalAlertComponent.defaultProps = {
    TitleText: "", 
    TitleID: "alert-dialog-title", 
    ContentID: "alert-dialog-description",
    withBackdrop: false,
    OnClose: (()=>{}), 
    withLeftButton: false, 
    LeftBtnColor: "secondary",
    RightBtnText: "OK", 
    RightBtnColor: "secondary",
    OnClickRightBtn: ()=>{},
    MaxWidthBreakDown: "md",
};

export default ModalAlertComponent;