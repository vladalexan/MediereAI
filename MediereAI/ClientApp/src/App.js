import React, { Component } from 'react';
import Home from './components/Pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Formular from './components/Pages/Formular/Formular'
import Autentificare from './components/Pages/Login.jsx'
import History from './components/Pages/History/History'
import Report from './components/Pages/Report/Report'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Contact from './components/Pages/Contact/Contact';
import Setup from './components/Pages/Setup/Setari';
import axios from 'axios';

function App() {

    axios.post('/api/view/Vizite')

        return (
            <>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/history' exact component={History}></Route>
                        <Route path='/form' exact component={Formular}></Route>
                        <Route path='/contact' exact component={Contact}></Route>
                        <Route path='/login' exact component={Autentificare}></Route>
                        <Route path='/report' exact component={Report}></Route>
                        <Route path='/setup' exact component={Setup}></Route>
                    </Switch>
                </Router>
            </>
        );
}
export default App;
