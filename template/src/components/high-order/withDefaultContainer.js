import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import HeaderComponent from 'components/header/Header.Default.Component';



/**
 * 
 * @param {object} Component page Container
 * @param {string} containerMaxWidth maximum width of Container component
 */
export default function withExampleContainer(textTitle, containerMaxWidth) {
    
    const theme = createMuiTheme({
        palette: {
          primary: {
            main: blue[300],
          },
          secondary: {
            main: blue[500],
          },
        },
        status: {
          danger: orange[500],
        },
        overrides: {
          MuiButton: {
            containedPrimary: {
              color: 'white',
            },
          },
        }
    });

    return (Component) => {
        
        class ExampleContainerHOC extends React.Component {
    
            render() {
                return(
                  <>
                  <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <HeaderComponent
                          TitleText={textTitle}
                        />
                        <Container maxWidth={containerMaxWidth}>
                          <Component/>
                        </Container>
                        
                    </ThemeProvider>
                  </>
                );
            }
        }
    
        return ExampleContainerHOC;
    };
}