import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from "../actions"
import { savedStore } from "../index"
import { Link } from "react-router-dom"

class SignOut extends Component {

    componentDidMount() {
        savedStore.flush()
        .then(a => {
            savedStore.purge()
            .then(a => {
                this.props.SignOutUser()
            })
        })
    }


    render() {
        return (
            <div>
                <div className="row">
                    <h1>You are now signed out </h1>
                </div>
                <div className="row">
                    <Link to="/"> Home </Link>
                </div>
            </div>
        )
    }

}

export default connect(null, actions)(SignOut)
