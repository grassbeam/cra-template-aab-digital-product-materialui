import React, { lazy, useState, useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import DefaultTheme from 'assets/styles/theme/Default.Theme';
import { GoogleAnalytics } from 'utils/helpers/Analytics';
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

        const ExampleContainerHOC = (props) => {

            const [state, setState] = useState({
              UserID: "Anonymous",
              ErrorStatus: 0,
              ErrorCodes: "",
            });

            const locationHistory = useLocation();
            
            const ComponentRef = optionIcon && React.createRef();

            useEffect(()=>{
              // TODO Fix The Broken Pieces
              const {
                pathname
              } = locationHistory;
              Log.debugGroup("Check locationHistory", locationHistory);
              GoogleAnalytics.PageView(pathname, pageName, { userId: state.UserID, ...optionGA });
            }, [locationHistory, state])

            /**
             * 
             * @param {String} ErrorCodes 
             * @param {Any} ErrorObject 
             * @param {Int} ErrorObjectType => 1 = Generic Exception, 2 = Invalid Response API,  
             */
             const handlingErrorStatus = (ErrorCodes, ErrorObject, ErrorObjectType = 1, isReportToSentry=true) => {
              setState({
                ErrorStatus: ErrorObjectType,
                ErrorCodes,
                ErrorObject
              },() => {
                if (isReportToSentry) {
                  Log.reportSentry(ErrorObject, state.UserID);
                }
              });
            }

            const onOptionClickItem = () => {
              ComponentRef.current.OnClickOptionItem();
            }

          return (
              <>
                <CssBaseline />
                  <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={DefaultTheme}>
                      <EGMonBoundariesComponent UserID={state.UserID} withEGMON={withEGMon} PageName={pageName} >
                        <Box style={{ backgroundColor:(backgroundColor??'#F4F4F4'), minHeight: ( containerMinHeight ?? (withHeader?'95vh':'100vh') ), }}>
                          <ErrorBoundariesComponent>
                            {
                              state.ErrorStatus > 0?
                                <DefaultContainerErrorHandler 
                                  ErrorStatus={state.ErrorStatus} 
                                  ErrorCodes={state.ErrorCodes}
                                  ErrorObject={state.ErrorObject} />
                              :
                              (    
                                <>
                                  { withHeader && <HeaderComponent TitleText={textTitle || ""} ActionIcon={optionIcon} ActionHandler={onOptionClickItem} /> }
                                  <Component
                                    ref={ComponentRef}
                                    _ShowErrorHandling={ handlingErrorStatus }
                                    {...props}
                                  />
                                </>
                              )
                            }
                          </ErrorBoundariesComponent>
                        </Box>
                      </EGMonBoundariesComponent>
                    </ThemeProvider>
                  </StyledEngineProvider>
                </>
          )
        }
    
        return ExampleContainerHOC;
    };
}
