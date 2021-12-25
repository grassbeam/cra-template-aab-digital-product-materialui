import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import withDefaultContainer from 'components/high-order/withDefaultContainer';
import MainLoader from 'components/loaders/main/MainLoader.Component';
import ModalAlertComponent from 'components/modal/alert/ModalAlert.Component';
import ModalConfirmationComponent from 'components/modal/confirmation/ModalConfirmation.Component';

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
            <Box sx={
                    (theme)=> ({
                        textAlign: 'center',
                        paddingTop: theme.spacing(3),
                    })
                }
            >
                
                <MainLoader
                    isLoading={this.state.isMainLoading}
                    onClose={(()=>this.handleToogleMainLoading(false))}
                    sx={{ color: 'red', }}
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
                    ContentText={[...new Array(10)]
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

                <Box sx={(theme) => ({ marginBottom: theme.spacing(5), })}>
                    <Typography variant="h6" component="h6">
                        MainLoading Component
                    </Typography>
                    <Button variant="contained" color="primary" onClick={(()=>this.handleToogleMainLoading(true))}>
                        Show
                    </Button>
                </Box>


                <Box sx={(theme) => ({ marginBottom: theme.spacing(5), })}>
                    <Typography variant="h6" component="h6">
                        ModalAlert Component
                    </Typography>
                    <Button variant="contained" color="primary" onClick={(()=>this.handleToogleModalAlert(true))}>
                        Show
                    </Button>
                </Box>

                <Box sx={(theme) => ({ marginBottom: theme.spacing(5), })}>
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


export default withDefaultContainer("Component Example", "Test Title")(UserFeedBackContainer);