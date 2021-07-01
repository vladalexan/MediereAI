import React from 'react'
import './CustomButton.css'
import logout from './Pages/Login/logout'
import { Link } from 'react-router-dom'

const STYLES = ['bttn--primary', 'bttn--outline', 'bttn--outline--red'];

const SIZES = ['bttn--medium', 'bttn--large', 'bttn--large--red'];

const AUTH = ['../inregistrare', '../login', '/', '/setup', '/about', '/raport', '/history'];

export const CustomButton = ({
    children,
    type,
    onClick,
    authStyle,
    buttonStyle,
    buttonSize
}) => {

    const checkClick = onClick;
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize)
        ? buttonSize
        : SIZES[0];

    const checkAuth = AUTH.includes(authStyle)
        ? authStyle
        : AUTH[0];

    return (
        <Link to={`${checkAuth}`} className='bttn-mobile'>
            <button
                className={`bttn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    )
};