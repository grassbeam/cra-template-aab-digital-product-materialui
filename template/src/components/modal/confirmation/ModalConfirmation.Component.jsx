import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, withCloseBtn, ...others } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...others}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


function ModalConfirmation(props) {
    

  const { TitleText, TitleID, ContentText, ContentID, 
        OnClose, withBackdrop, isShowing,
        withDividerContent, withCloseBtn, withFullHeight,
        withLeftButton, LeftBtnText, OnClickLeftBtn, 
        RightBtnText, OnClickRightBtn, MaxWidthBreakDown }
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
            
            <Button onClick={OnClickLeftBtn} color="primary">
                {LeftBtnText}
            </Button>
        }
        <Button onClick={OnClickRightBtn} color="primary" autoFocus={!withFullHeight}>
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
     MaxWidthBreakDown: PropTypes.oneOf(['xs', 'sm',' md', 'lg', 'xl']),
};

ModalConfirmation.defaultProps = {
    TitleText: "", 
    TitleID: "confirmation-dialog-title", 
    ContentID: "confirmation-dialog-description",
    withBackdrop: false,
    OnClose: (()=>{}), 
    withLeftButton: false, 
    RightBtnText: "Yes", 
    OnClickRightBtn: ()=>{},
    withDividerContent: false, 
    withCloseBtn: false,
    withFullHeight: false,
    MaxWidthBreakDown: 'md',
};

export default ModalConfirmation;