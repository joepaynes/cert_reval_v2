import React, { Component } from 'react';

//REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
        
      <div className="landing">
       <header>
         <div className="header">
           <div className="header__logo-box">
             <img src="img/logo.png" alt="Certify Banner" className="header__logo"/>
           </div>
           <div className="header__auth-buttons">
               <Link to="/signin" className="header__auth-buttons--signin"> Sign In </Link>
               <Link to="/signup" className="header__auth-buttons--signup"> Sign Up </Link>
           </div>
         </div>
       </header>  
        <main> 
          <div className="landing__left-side u-text-align-center">
            <h1 className="heading-huge heading-huge--landing"> <span className="u-bold"> All </span> of your certificates <br/> and qualifications in one place</h1>
            <h2 className="u-margin-bottom-medium"> Expiry tracking, smart notifications and date calculations to keep you on top of your job. </h2> 
            <form className="form" action="#">
              <div className="form__container">
                <div className="form__group">
                    <input className="form__input form__input--landing" type="email" id="email" placeholder="Email Address" required />
                    <label className="form__label form__label--landing" htmlFor="email">Email Address</label>
                    <button className="form__button button" type="submit"> Sign up now </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div> 
    );
  }
}

export default Landing;