import React from 'react';
import { Link } from "react-router-dom";
import logo from 'assets/images/logo.svg';





class HomeExampleContainer extends React.Component {


    render() {
        return(    
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span>
                        Example Component List
                    </span>
                    <ul>
                        <li>
                            <Link to="/example/components">Example Components</Link> 
                        </li>
                    </ul>
                </header>
            </div>
        );
    }
}


export default HomeExampleContainer;