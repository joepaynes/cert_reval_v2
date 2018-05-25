import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from "../../actions"

import SignUpPage1 from "./signup-page-1";
import SignUpPage2 from "./signup-page-2";

class SignUpForm extends Component {

      constructor(props){
        super(props)
        
        this.state = {
          page: 1
        }

        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      handleSubmit(values) {
        this.props.SignUpUser(values);
      }

      nextPage() {
        this.setState({ page: this.state.page + 1 })
      }

      previousPage() {
        this.setState({ page: this.state.page - 1 })
      }
      
      render() {
          const { page } = this.state
          return (
            <div>
            {page === 1 && <SignUpPage1 onSubmit={this.nextPage}/>}
            {page === 2 && <SignUpPage2 previousPage={this.previousPage} onSubmit={this.handleSubmit}/>}
            </div>
          ) 

      }
  }
  
  // CORE HTML OF FIELD COMPONENT. ALLOWS FOR ERROR HANDLING FROM REDUX FORM

  
  export default connect(null, actions)(SignUpForm);