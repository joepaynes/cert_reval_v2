import React, { Component } from 'react';

import SignUpForm from '../components/forms/signupform';
import SignInForm from '../components/forms/signinform';

class Entrance extends Component {

  renderForm() {
    const param = this.props.match.params.direction
    
    if (param === "signup") {
      return <SignUpForm />
    }

    if (param === "signin") {
      return <SignInForm />
    }

  }

    render() {
        return (
        <div className="entrance">
            <video className="background-video" autoPlay muted loop>
                  <source src="img/Productive-Morning.mp4" type="video/mp4" />
                  Your browser does not support this video - This video is only for display purposes
            </video>
    
            <div className="entrance__header">
              <img className="entrance__header--logo" src="img/logo.png"  />
            </div>
    
            <div className="entrance__content">
              <div className="entrance__form">
                <div className="entrance__text">
                  <h1>Certificate Management Allowing you to focus on whats important</h1>
                </div>
                <div className="entrance__form-content">
                  {this.renderForm()}
                </div>
              </div>
            </div>
    
            <div className="entrance__footer">
    
            </div>
    
        </div>
        );
    }
}

export default Entrance;