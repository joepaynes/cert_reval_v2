import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import * as actions from "../../actions"
import { connect } from 'react-redux';

 class SignUpPage1 extends Component {

    render() {
        const {handleSubmit} = this.props
        return (
            <form className="auth-form__form" onSubmit={handleSubmit}>
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
                <button type="submit" className="auth-form__button">Next</button>
            </form>
        )
    }

  renderAuthError() {
       if(this.props.error) {
          return (
            <span> {this.props.error} </span>
          )
        }
    }

    componentWillMount = () => {
        this.props.clearAuthError()
    }

} // Closes Component



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
  form: 'signup', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(connect(mapStateToProps, actions)(SignUpPage1))