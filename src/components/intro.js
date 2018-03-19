import React, { Component } from "react"
import { reduxForm, Field } from 'redux-form'
import { connect } from "react-redux"
import * as actions from "../actions"
import { db, savedStore } from "../index"


class IntroScreen extends Component {

    handleFormSubmit(values) {

        // grab uid from redux state to post to db
        let UID = this.props.user.uid;

        // Post user details to db.
        db.collection("users").doc(UID).set({
            uid: UID,
            firstname: values.firstname,
            lastname: values.lastname,
            industry: values.industry,
            dob: values.DOB
        })
        .catch(function(error){
            console.log("Document did not write: ", error)
        })

        // Revert to normal db state
        this.props.endIntro()

    }
    
    render() {
        console.log(this.props.user)
        const { handleSubmit } = this.props
        return(
            <div className="intro-container">
                <div className="row">
                    <h1>Welcome to Certify</h1>
                    <h2> Certificate management simplified </h2>
                    <h4> To set up your account we just need to know a bit more about you </h4>
                </div>
                
                <form className="auth-form__form auth-form__form--signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="auth-form__form-field">
                        <Field component={renderField} type="text" name="firstname" placeholder="first" label="Firstname" />
                    </div>
                    <div className="auth-form__form-field u-no-bottom-margin">
                        <Field component={renderField} type="text" name="lastname" placeholder="last" label="Lastname" />
                    </div>
                    <div className="auth-form__auth-error-container">
                        <Field component={renderField} type="text" name="industry" placeholder="industry" label="Industry" />
                    </div>
                    <div className="auth-form__auth-error-container">
                        <Field component={renderField} type="date" name="DOB" placeholder="" label="Date Of Birth" />
                    </div>
                    <button type="submit" className="auth-form__button">sign up</button>
                </form>
            </div>
        )
    }
}

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

function mapStateToProps(state) {
    return { user: state.user}
}

export default reduxForm({
    form: "intro"
})(connect(mapStateToProps, actions)(IntroScreen))