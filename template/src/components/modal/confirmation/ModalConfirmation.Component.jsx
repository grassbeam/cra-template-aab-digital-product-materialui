import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const DialogTitle = (props) => {
  const { children, onClose, withCloseBtn, ...others } = props;
  return (
   <MuiDialogTitle sx={(theme) => ({ margin:0, padding: theme.spacing(2), })} {...others}>
     {children}
     {onClose ? (
       <IconButton
        aria-label="close"
        sx={(theme) => ({ 
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500], 
        })}
        onClick={onClose}
        size="large">
         <CloseIcon />
       </IconButton>
     ) : null}
   </MuiDialogTitle>
  );
};


function ModalConfirmation(props) {
    

  const { TitleText, TitleID, ContentText, ContentID, 
        OnClose, withBackdrop, isShowing,
        withDividerContent, withCloseBtn, withFullHeight,
        withLeftButton, LeftBtnText, LeftBtnColor, OnClickLeftBtn, 
        RightBtnText, RightBtnColor, OnClickRightBtn, MaxWidthBreakDown }
    = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(MaxWidthBreakDown));

  return (
    
    <Dialog 
        onClose={withBackdrop && OnClose} 
        aria-labelledby="confirmation-dialog-title" 
        open={isShowing}
        scroll={withFullHeight? "body":"paper"}
        fullScreen={fullScreen}
    >
        <DialogTitle id={TitleID} onClose={withCloseBtn && OnClose}>
            {TitleText}
        </DialogTitle>
        <DialogContent id={ContentID} dividers={withDividerContent}>{ ContentText }</DialogContent>
        <DialogActions>
        {
            withLeftButton &&
            
            <Button onClick={OnClickLeftBtn} color={LeftBtnColor} >
                {LeftBtnText}
            </Button>
        }
        <Button onClick={OnClickRightBtn} color={RightBtnColor} autoFocus={!withFullHeight}>
            {RightBtnText}
        </Button>
        </DialogActions>
    </Dialog>
  );
}

ModalConfirmation.propTypes = {
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
     * Flag for dividers on DialogContent
     */
    withDividerContent: PropTypes.bool, 
    /**
     * Flag for X button on top right modal
     */
    withCloseBtn: PropTypes.bool,
    /**
     * Flag for scrolling modal without limit height
     */
     withFullHeight: PropTypes.bool,
    /**
     * Max width size, value must be 'xs', 'sm',' md', 'lg', 'xl'
     */
     MaxWidthBreakDown: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

ModalConfirmation.defaultProps = {
    TitleText: "", 
    TitleID: "confirmation-dialog-title", 
    ContentID: "confirmation-dialog-description",
    withBackdrop: false,
    OnClose: (()=>{}), 
    withLeftButton: false,
    LeftBtnColor: "secondary",
    RightBtnText: "Yes", 
    RightBtnColor: "secondary",
    OnClickRightBtn: ()=>{},
    withDividerContent: false, 
    withCloseBtn: false,
    withFullHeight: false,
    MaxWidthBreakDown: 'md',
};

export default ModalConfirmation;