import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";

import { Archive, ClassicComputer, CrossHair } from '../svg/sprites';

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickCalculator = this.handleClickCalculator.bind(this);
        this.handleClickTracker = this.handleClickTracker.bind(this);
    }

    render() {
        return (
        <nav className="sidebar">
            <ul className="side-nav"> 
                <li onClick={()=>{this.handleClickHome()}} className="side-nav__item">
                    <a className="side-nav__link" href="" onClick={this.handleClick}>
                        <Archive />
                        <span>Certificates</span>
                    </a>
                </li>
                <li onClick={()=>{this.handleClickCalculator()}} className="side-nav__item">
                    <a className="side-nav__link" href="" onClick={this.handleClick}>
                        <ClassicComputer />
                        <span>Sea Time Calculator</span>
                    </a>
                </li>
                <li onClick={()=>{this.handleClickTracker()}} className="side-nav__item">
                    <a className="side-nav__link" href="" onClick={this.handleClick}>
                        <CrossHair />
                        <span>Tracker</span>
                    </a>
                </li>
            </ul>
        </nav>
        )
    }

    handleClick(event) {
        event.preventDefault();
    }

    handleClickHome() {
        this.props.dashSelected("home");
    }

    handleClickCalculator() {
        this.props.dashSelected("calculator");
    }

    handleClickTracker() {
        this.props.dashSelected("tracker");
    }
}

export default connect(null, actions)(SideBar);