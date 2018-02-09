import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';

import { Link } from "react-router-dom";

import Header from "./header"

// MOCK UP COMPONENT

class Dashboard extends Component {
    render() {
        console.log(this.props.user)
        console.log(this.props.test)
        return (
            <div>
                <p> Dashboard </p>
                <Link to="/signout"> Sign out </Link>
            </div>   
        )
    }
}

export default compose(
    firestoreConnect(['users', 'messages']), 
    connect((state) => ({
        user: state.firestore.data,
        test: state
    })),
)(Dashboard);


