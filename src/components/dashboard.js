import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase';


// MOCK UP COMPONENT

class Dashboard extends Component {
 
    render() {
        console.log(this.props)
        return (
            <div>
                Dashboard
            </div>   
        )
    }
}

export default compose(
    firestoreConnect(['users']), 
    connect((state, props) => ({
        user: state.firestore.data
    })),
)(Dashboard);


