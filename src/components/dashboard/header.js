import React, { Component } from 'react';

import { DropDown, Bell } from '../svg/sprites';

class Header extends Component {

render() {
    return (
     
    <header className="header">
        <img src="img/logo.png" className="header__logo"/>
        
        <nav className="user-nav">
            <div className="user-nav__icon-box">
                <Bell />
                {/* ADD NOTIFICATION ABILITY */}
                <span className="user-nav__notification">13</span>
            </div>

            {/* ADD FUNCTIONALITY TO GRAB USER DATA */}
            <div className="user-nav__user">
                <img src="img/user.png" alt="User Display Photo" className="user-nav__user-photo" />
                <span className="user-nav__user-name">Joe</span>
                <DropDown />
            </div>
        </nav>
        
    </header>    
    )
}

}

export default Header;
