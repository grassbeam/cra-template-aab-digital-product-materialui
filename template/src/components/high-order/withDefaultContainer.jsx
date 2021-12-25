import React, { lazy } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import DefaultTheme from 'assets/styles/theme/Default.Theme';
import 'assets/styles/css/index.scss';
import { withRouter } from "react-router";
import { getCookie } from 'utils/helpers/General';
import Analytics from 'utils/helpers/Analytics';
import * as Log from 'utils/helpers/Logger';
import ErrorBoundariesComponent from 'components/boundaries/error/ErrorBoundaries.Component';
import EGMonBoundariesComponent from 'components/boundaries/egmon/EGMonBoundaries.Component';


const HeaderComponent  = lazy(()=>import('components/header/default/Header.Default.Component'));
const DefaultContainerErrorHandler = lazy(()=>import('components/container/error-handler/DefaultErrorHandler.Container'));

/**
 * 
 * @param {object} Component page Container
 * @param {string} containerMaxWidth maximum width of Container component
 */
export default function withDefaultContainer(pageName, textTitle="", withHeader=true, optionContainer = {}, optionGA, withEGMon=true, UserEGMON ) {
    const { backgroundColor='#F4F4F4', containerMinHeight, optionIcon, } = optionContainer || {};
    return (Component) => {

        class ExampleContainerHOC extends React.Component {

            constructor(props) {
              super(props);
              this.ComponentRef = optionIcon && React.createRef();
              this.state = {
                UserID: UserEGMON??getCookie("GHT_SESSION")??"Unknown",
                ErrorStatus: 0,
                ErrorCodes: "",
              }
            }
            
            componentDidMount() {
              const {
                location: { pathname: page }
              } = this.props;
              Analytics.PageView(page, pageName, { userId: this.state.UserID, ...optionGA });
            }

            /**
             * 
             * @param {String} ErrorCodes 
             * @param {Any} ErrorObject 
             * @param {Int} ErrorObjectType => 1 = Generic Exception, 2 = Invalid Response API,  
             */
            handlingErrorStatus(ErrorCodes, ErrorObject, ErrorObjectType = 1, isReportToSentry=true) {
              this.setState({
                ErrorStatus: ErrorObjectType,
                ErrorCodes,
                ErrorObject
              },() => {
                if (isReportToSentry) {
                  Log.reportSentry(ErrorObject, this.state.UserID);
                }
              });
            }

            onOptionClickItem() {
              this.ComponentRef.current.OnClickOptionItem();
            }
    
            render() {
                return(
                  <>
                  <CssBaseline />
                    <ThemeProvider theme={DefaultTheme}>
                      <EGMonBoundariesComponent UserID={this.state.UserID} withEGMON={withEGMon} PageName={pageName} >
                        <Box style={{ backgroundColor:(backgroundColor??'#F4F4F4'), minHeight: ( containerMinHeight ?? (withHeader?'95vh':'100vh') ), }}>
                          <ErrorBoundariesComponent>
                            {
                              this.state.ErrorStatus > 0?
                                <DefaultContainerErrorHandler 
                                  ErrorStatus={this.state.ErrorStatus} 
                                  ErrorCodes={this.state.ErrorCodes}
                                  ErrorObject={this.state.ErrorObject} />
                              :
                              (    
                                <>
                                  { withHeader && <HeaderComponent Title={textTitle || ""} ActionIcon={optionIcon} ActionHandler={this.onOptionClickItem.bind(this)} /> }
                                  <Component
                                    ref={this.ComponentRef}
                                    _ShowErrorHandling={ this.handlingErrorStatus.bind(this) }
                                    {...this.props}
                                  />
                                </>
                              )
                            }
                          </ErrorBoundariesComponent>
                        </Box>
                      </EGMonBoundariesComponent>
                    </ThemeProvider>
                  </>
                );
            }
        }
    
        return withRouter(ExampleContainerHOC);
    };
}
