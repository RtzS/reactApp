import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/header/header';
import Employees from './components/employees/employees';
import './App.css';

class App extends Component {
    render() {
        return ( <
            div className = "App" >
            <
            Nav / >
            <
            Employees / >
            <
            /div>
        );
    }
}

export default App;