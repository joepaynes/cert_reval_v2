import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form"
import { connect } from 'react-redux'
import * as actions from "../actions"

import { Link } from "react-router-dom"

class SignUp extends Component {

      componentWillMount() {
        this.props.clearAuthError()
      }
  
      handleFormSubmit({ email, password }) {
          this.props.SignUpUser({email, password})
      }

      renderAuthError() {
        if(this.props.error) {
          return (
            <span> {this.props.error} </span>
          )
        }
      }
    
      render() {
          const { handleSubmit } = this.props
          return (
            <div className="auth-form__background">
              <div className="auth-form__container">
                <div className="auth-form__logo-box">
                  <Link to="/"><img className="auth-form__logo" src="img/logo.png" /></Link>
                </div>
                <hr/>
                <div className="auth-form__header-text-box">
                  <h1 className="auth-form__header-text">Sign up</h1>
                </div>
  
                <form className="auth-form__form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <div className="auth-form__form-field">
                    <Field component={renderField} type="email" name="email" label="Your email:" />
                  </div>
                  <div className="auth-form__form-field">
                    <Field component={renderField} type="password" name="password" label="Your password:" />
                  </div>
                  <div className="auth-form__form-field u-no-bottom-margin">
                    <Field component={renderField} type="password" name="confirmPassword" label="Confirm your password:" />
                  </div>
                  <div className="auth-form__auth-error-container">
                    {this.renderAuthError()}
                  </div>
                  <button type="submit" className="auth-form__button">sign up</button>
                </form>
  
                <div className="auth-form__vendor-container auth-form__vendor-container-signin">
                  <p className="auth-form__vendor-text"> - or sign in with - </p>
                  <ul className="auth-form__vendor-links">
                    <li><i className="ion-social-facebook-outline icon icon-bigger"></i></li>
                    <li><i className="ion-social-twitter-outline icon icon-bigger"></i></li>
                    <li><i className="ion-social-google-outline icon icon-bigger"></i></li>
                    <li><i className="ion-social-linkedin-outline icon icon-bigger u-no-margin-right"></i></li>
                  </ul>
                </div>
                <hr/>
  
                <div className="auth-form__signup-container">
                  <div className="auth-form__signup-text-container">
                    <p> Already registered with us? </p>
                  </div>
                  <div className="auth-form__signup-link-container">
                  <Link to="/signin" className="auth-form__signup-link">Sign in now</Link>
                  </div>
                </div>
  
  
              </div>
            </div>  
          )
      }
  }
  
  // CORE HTML OF FIELD COMPONENT. ALLOWS FOR ERROR HANDLING FROM REDUX FORM
  
  const renderField = ({
    input,
    placeholder,
    type,
    label,
    meta: { touched, error, warning }
    
  }) => (
        <div>
        <div className="auth-form__field-error-container clearfix">
        <span className="auth-form__field-label"> {label} </span>  {touched && ((error && <span className="auth-form__field-error"> {error} </span>) || (warning && <span> {warning} </span>))}
        </div>
        <div className="auth-form__input-container">
          <input className="auth-form__input" {...input} placeholder={placeholder} type={type} required/>
        </div>
        </div>
  )

  const validate = values => {
    
    const errors = {}

    if(!values.email) {
      errors.email = "This is a required field"
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Not a vaild email"
    }

    if(!values.password) {
      errors.password = "This is a required field"
    }
    else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if(!values.confirmPassword) {
      errors.confirmPassword = "This is a required field"
    }
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match"
    }

    return errors;
  }

  function mapStateToProps(state) {
    return { error: state.auth.error };
   }
  
  
  export default reduxForm({
      form: "signin",
      validate,
  })(connect(mapStateToProps, actions)(SignUp))