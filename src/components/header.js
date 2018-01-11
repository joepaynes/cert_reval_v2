import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';


//REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render() {
        return (
            <header>
                <div className="header">
                    <div className="header__logo-box">
                        <img src="img/logo.png" alt="Certify Banner" className="header__logo"/>
                    </div>
                    <div className="header__auth-buttons">
                        <Link to="/signin" className="header__auth-buttons--signin"> Sign In </Link>
                        <Link to="/signup" className="header__auth-buttons--signup"> Sign Up </Link>
                        <Link to="/signout" className="header__auth-buttons--signout"> Sign Out </Link>
                    </div>
                </div>
            </header>  
        )
    }
}

export default Header;