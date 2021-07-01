import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

function logout() {
    sessionStorage.clear();
    sessionStorage.setItem('isAuthenticated', 'false');
    console.log(sessionStorage.getItem('isAuthenticated'));
    alert("Urmeaza sa fiti deconectat")
    return (
        <Redirect to='/' />
    );
}
export default logout;