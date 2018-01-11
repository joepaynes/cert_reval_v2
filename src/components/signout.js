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
            <Container text style={{ marginTop: '10em' }}>
                <Header as="h1" textAlign={"center"}> You are now signed out </Header>
             </Container>
        )
    }

}

export default connect(null, actions)(SignOut)
