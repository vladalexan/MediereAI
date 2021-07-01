import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar'
import HomeCover from './HomeCover'

function Home() {

    return (
        <>
            <Navbar />
            <HomeCover />
        </>
    );

}

export default Home;
