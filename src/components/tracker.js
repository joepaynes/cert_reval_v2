import React, { Component } from 'react';
import { connect } from "react-redux";
import { db } from "../index"

import randomstring from 'randomstring';

class Tracker extends Component {

    generateLink() {
        let uid = this.props.user.uid;
        let key = randomstring.generate(24);

        db.collection("users").doc(uid).update({
            "currentCertBucketKey": key
        })
        .then(a => {
            //Copy generated link to clipboard and advise that if button clicked again all previous links void
            alert(`localhost:3000/certBucket/${uid}&${key}`);
        })
        .catch(function(error){
            alert("Document did not write and link not generated due to: ", error)
        })


    }
    
    render() {
        return (
            <div>
                <button onClick={() => {this.generateLink()}}>Generate Link</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Tracker)