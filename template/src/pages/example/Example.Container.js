import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import withExampleContainer from 'components/high-order/withDefaultContainer';
import MainLoader from 'components/loaders/main/MainLoader.Component';
import ModalAlertComponent from 'components/modal/alert/ModalAlert.Component';
import ModalConfirmationComponent from 'components/modal/confirmation/ModalConfirmation.Component';

const styles = (theme) => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing(3),
    },
    ComponentContainer: {
        marginBottom: theme.spacing(5),
    },
    MainLoader: {
        color: 'red', // color for spinner / progress
    }
})

class UserFeedBackContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMainLoading: false,
            isShowModalAlert: false,
            isShowModalConfirmation: false,
        }
    }

    handleToogleMainLoading(flag) {
        this.setState({ isMainLoading: flag })
    }

    handleToogleModalAlert(flag) {
        this.setState({ isShowModalAlert: flag })
    }

    handleToogleModalConfirmation(flag) {
        this.setState({ isShowModalConfirmation: flag })
    }


    render() {
        return(   
            <Box className={this.props.classes.root}>
                
                <MainLoader
                    isLoading={this.state.isMainLoading}
                    onClose={(()=>this.handleToogleMainLoading(false))}
                    className={this.props.classes.MainLoader}
                />
                <ModalAlertComponent
                    TitleText="Alert Title Here"
                    TitleID="modal-alert-id-title"
                    ContentText="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                    ContentID="modal-alert-id-content"
                    OnClose={(()=>this.handleToogleModalAlert(false))}
                    withBackdrop
                    isShowing={this.state.isShowModalAlert}
                    withLeftButton
                    LeftBtnText="Cancel"
                    OnClickLeftBtn={(()=>this.handleToogleModalAlert(false))}
                    RightBtnText="Ok"
                    OnClickRightBtn={(()=>this.handleToogleModalAlert(false))}
                />
                
                <ModalConfirmationComponent
                    TitleText="Alert Title Here"
                    TitleID="modal-alert-id-title"
                    ContentText={[...new Array(50)]
                        .map(
                        () => `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                    ContentID="modal-alert-id-content"
                    OnClose={(()=>this.handleToogleModalConfirmation(false))}
                    withBackdrop
                    isShowing={this.state.isShowModalConfirmation}
                    withLeftButton
                    LeftBtnText="Cancel"
                    OnClickLeftBtn={(()=>this.handleToogleModalConfirmation(false))}
                    RightBtnText="Ok"
                    OnClickRightBtn={(()=>this.handleToogleModalConfirmation(false))}
                    withDividerContent
                    withCloseBtn
                    withFullHeight
                />

                <Box className={this.props.classes.ComponentContainer}>
                    <Typography variant="h6" component="h6">
                        MainLoading Component
                    </Typography>
                    <Button variant="contained" color="primary" onClick={(()=>this.handleToogleMainLoading(true))}>
                        Show
                    </Button>
                </Box>


                <Box className={this.props.classes.ComponentContainer}>
                    <Typography variant="h6" component="h6">
                        ModalAlert Component
                    </Typography>
                    <Button variant="contained" color="primary" onClick={(()=>this.handleToogleModalAlert(true))}>
                        Show
                    </Button>
                </Box>

                <Box className={this.props.classes.ComponentContainer}>
                    <Typography variant="h6" component="h6">
                        ModalConfirmationComponent Component
                    </Typography>
                    <Button variant="contained" color="primary" onClick={(()=>this.handleToogleModalConfirmation(true))}>
                        Show
                    </Button>
                </Box>

            </Box>
        );
    }
}


export default withExampleContainer("Component Example", "sm")(withStyles(styles, { isWithTheme: true})(UserFeedBackContainer));