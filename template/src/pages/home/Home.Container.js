import React from 'react';
import { Link } from "react-router-dom";
import logo from 'assets/images/logo.svg';
import { APP_BUILD_VERSION, APP_BUILD_NAME } from 'utils/values/Config';





class HomePage extends React.Component {


    render() {
        return(    
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    App build version = { APP_BUILD_VERSION }
                    <br/>
                    App build name = { APP_BUILD_NAME }
                    </p>
                    <span>
                    Choose one of link bellow:
                    </span>
                    <ul>
                    <li>
                        <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Learn React
                        </a>
                        &nbsp;(Official React Documentation)
                    </li>
                    <li>    
                        <Link to="/example">Example Components</Link> 
                        &nbsp;(AAB Template Component)
                    </li>
                    </ul>
                </header>
            </div>
        );
    }
}


export default HomePage;