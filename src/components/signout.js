import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from "../actions"
import { Container, Header } from "semantic-ui-react"

class SignOut extends Component {

    componentDidMount() {
        this.props.SignOutUser()
    }


    render() {
        return (
            <div className="row">
                <h1>You are now signed out </h1>
            </div>
        )
    }

}

export default connect(null, actions)(SignOut)
