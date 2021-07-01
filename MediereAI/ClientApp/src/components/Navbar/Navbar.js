import React, { Component, useState, useEffect, setState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { CustomButton } from '../CustomButton.js';
import logout from '../Pages/Login/logout';

function Navbarul() {
    const [auth, setAuth] = useState(false);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);

    return (
        <>
            <nav style={{ whiteSpace: "nowrap" }} class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">AI Mediation</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item:focus">
                                <Link to="/" class={window.location.pathname === '/' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page" >
                                    Home
                                </Link>
                            </li>
                            {sessionStorage.getItem('isAuthenticated') === 'true' ? <li class="nav-item">
                                <Link to="/history" class={window.location.pathname === '/history' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page">
                                    History
                                </Link>
                            </li> : null}
                            <li className='nav-item'>
                                <Link to='/form' class={window.location.pathname === '/form' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page">
                                    Register Complaint
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/contact' class={window.location.pathname === '/contact' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page">
                                    Contact
                                </Link>
                            </li>
                            {sessionStorage.getItem('admin') === 'true' ?
                                <li className='nav-item'>
                                    <Link to='/report' class={window.location.pathname === '/report' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page">
                                        Report
                                </Link>
                                </li>
                                : null}
                            {sessionStorage.getItem('admin') === 'true' ?
                                <li className='nav-item'>
                                    <Link to='/setup' class={window.location.pathname === '/setup' ? 'nav-link active bg-transparent' : 'nav-link'} aria-current="page">
                                        Setup
                                </Link>
                                </li>
                                : null}
                            {sessionStorage.getItem('isAuthenticated') === 'true' ?
                                <CustomButton className='bttn' authStyle='/'
                                    onClick={logout}
                                    buttonStyle='bttn--outline'
                                    buttonSize='bttn--small'>
                                    LOG OUT
                                </CustomButton>
                                : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbarul;
