import React, { Component } from "react"
import { reduxForm, Field } from 'redux-form'
import { connect } from "react-redux"
import * as actions from "../actions"
import { db, savedStore } from "../index"
import moment from 'moment';


class CertForm extends Component {

    handleFormSubmit(values) {
        // grab uid and orignal certificate array from redux state
        let UID = this.props.user.uid;
        let certArray = this.props.user.instance.certificates
        // calculate expiry date
        let date = moment(values.issueDate);
        let expiry = moment(date).add(values.validity, 'y');
        values.expiryDate = moment(expiry).format("YYYY-MM-DD");
        delete values.validity;

        // Push new cert to the array
        certArray.push(values);
        
        // *IMPORTANT*
        // AT THE MOMENT, LITERALLY REPLACES THE OLD ARRAY WITH THE NEW ARRAY, IT DOESN'T UPDATE IT SO ITS INNEFFICIENT IN THAT 
        // SENSE, FIRESTORE DOESN'T LET YOU PUSH OBJECTS TO AN ARRAY. TRY TRANSACTIONS?

        // Update old array with new cert array
        db.collection("users").doc(UID).update({
            "certificates": certArray
        }).then(
            // Switch loading flag to load the new certificate that has been added to database
            this.props.loadData()
        )
        .catch(function(error){
            console.log("Document did not write: ", error)
        })
    }
    
    render() {
        const { handleSubmit } = this.props
        return(
            <div className="intro-container">
                <div className="row">
                    <h1> Add a certificate</h1>
                </div>
                <form className="auth-form__form auth-form__form--signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="auth-form__form-field u-no-bottom-margin">
                        <Field component={renderField} type="date" name="issueDate" placeholder="name" label="Issue Date" />
                    </div>
                    <div className="auth-form__form-field">
                        <Field component={renderField} type="text" name="name" placeholder="name" label="Name" />
                    </div>
                    <div className="auth-form__form-field">
                        <Field component={renderField} type="number" name="validity" placeholder="5" label="Validity" />
                    </div>
                    <button type="submit" className="auth-form__button">Add Certificate</button>
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
    return { 
        user: state.user,
        state: state
    }
}

export default reduxForm({
    form: "CertForm"
})(connect(mapStateToProps, actions)(CertForm))


