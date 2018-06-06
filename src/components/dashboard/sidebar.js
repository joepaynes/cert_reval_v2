import React, { Component } from 'react';

import { Archive, ClassicComputer, CrossHair } from '../svg/sprites';

class SideBar extends Component {
    render() {
        return (
        <nav className="sidebar">
            <ul className="side-nav"> 
                <li className="side-nav__item">
                    <a className="side-nav__link" href="./index.html">
                        <Archive />
                        <span>Certificates</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    <a className="side-nav__link" href="./seatime-calculator.html">
                        <ClassicComputer />
                        <span>Sea Time Calculator</span>
                    </a>
                </li>
                <li className="side-nav__item">
                    <a className="side-nav__link" href="#">
                        <CrossHair />
                        <span>Tracker</span>
                    </a>
                </li>
            </ul>
        </nav>
        )
    }
}

export default SideBar;