import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';

import Header from "./header"

// MOCK UP COMPONENT

class Dashboard extends Component {
    render() {
        console.log(this.props.user)
        console.log(this.props.test)
        return (
            <div>
                <Header />
                Dashboard
            </div>   
        )
    }
}

export default compose(
    firestoreConnect(['users']), 
    connect((state, props) => ({
        user: state.firestore.data,
        test: state
    })),
)(Dashboard);


