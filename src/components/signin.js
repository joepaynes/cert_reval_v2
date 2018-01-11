import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form"
import { connect } from 'react-redux'
import * as actions from "../actions"
import { Button, Form, Grid, Header, Segment, Label } from 'semantic-ui-react'

class SignIn extends Component {

    handleFormSubmit({ email, password }) {
        this.props.SignInUser({email, password})
    }

    render() {
        console.log(this.props.auth)
        const { handleSubmit } = this.props
        return (
            <div className='login-form'>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid
              textAlign='center'
              style={{ height: '100%' }}
              verticalAlign='middle'
            >
              <Grid.Column style={{ maxWidth: 700 }}>
                <Header as='h2' color='black'  textAlign='center'>
                    Sign In
                </Header>
                <Form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this))} size='large'>
                  <Segment stacked>
                    <Field placeholder="Email" name="email" component={renderField} type="text" icon="user" iconPosition="left" />
                    <Field placeholder="Password" name="password" component={renderField} type="password" icon="lock" iconPosition="left" />
                    {<Button style={{marginTop: "1em"}} type="submit" color='black' fluid size='large'>Go!</Button>}
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        )
    }
}

// CORE HTML OF FIELD COMPONENT. ALLOWS FOR ERROR HANDLING FROM REDUX FORM
const renderField = ({
    input,
    type,
    icon,
    iconPosition,
    placeholder,
    meta: {touched, error, warning}
}) => (
    <div>
    <Form.Input {...input} type={type} style={{marginTop: "1em"}} fluid icon= {icon} iconPosition= {iconPosition} placeholder={placeholder} /> 
    {touched &&
        ((error && <Label style={{width: "100%"}}color='red'>{error}</Label>) ||
          (warning && <span>{warning}</span>))}
    </div>
)

function mapStateToProps(state) {
   return { auth: state.auth.authenticated };
  }

export default reduxForm({
    form: "signin",
})(connect(mapStateToProps, actions)(SignIn))