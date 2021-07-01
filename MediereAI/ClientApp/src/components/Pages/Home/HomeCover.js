import React, { useState } from 'react';
import axios from 'axios';
import { CustomButton } from '../../CustomButton';
import '../../CustomButton.css';
import './HomeCover.css';
import logout from '../Login/logout';

function HomeCover(props) {
    const [numar, setNumar] = useState('')
    if (sessionStorage.getItem('isAuthenticated') !== 'true') {
        const venit = "WELCOME"

        return (
            <div className='home-container'>
                <h2 style={{ color: 'white', marginTop: '20px' }}>AI Mediation</h2>
                <h1>{venit}</h1>
                <div className='home-btns2'>
                    <CustomButton
                        className='bttn'
                        authStyle='../login'
                        buttonStyle='bttn--outline'
                        buttonSize='bttn--large'>
                        Sign In / Sign Up
                    </CustomButton>
                </div>
            </div>
        );
    }

    function setNumarul() {
        axios.post('api/view/getVizite')
            .then(result => {
                setNumar(result.data);
            })
    }

    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        const nume = sessionStorage.getItem('prenume');
        setNumarul();
        return (

            <div className='home-container'>
                <h2 style={{ color: 'white', marginTop: '20px' }}>AI Mediation</h2>
                <div className="home-title">
                    <text>WELCOME {nume.toString().toUpperCase()}</text>
                    {sessionStorage.getItem('admin') === 'true' ?
                        <div style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: "20px",
                            marginLeft: "-1em"
                        }}>
                            Visitors: {numar}
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

export default HomeCover;
