import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Landing extends Component {

  render() {
    return (
      <div>
        <section className="section-video">
          <header className="header">
            <div className="header__logo-box">
              <Link to="/"><img className="header__logo" src="img/logo-white.png" /></Link>
            </div>
            <div className="header__links-box">
              <ul className="header__links-list">
                <Link to="/about" className="header__link">About us</Link>
                <Link to="/product" className="header__link">Product</Link>
                <Link to="/plans" className="header__link">Pricing</Link>
                <Link to="/signin" className="header__link">Sign In</Link>
                <Link to="/signup" className="header__link">Sign up</Link>
              </ul>
            </div>
          </header>
          <div className="background-video-container">  
            <video className="background-video" autoPlay muted loop>
              <source src="img/Industrial_Brooklyn.mp4" type="video/mp4" />
              <source src="img/Mega_Brooklyn.webm" type="video/webm" />
              Your browser does not support this video - This video is only for display purposes
            </video>
            <div className="row">
            <div className="landing__jumbotron-container">
              <h1 className="heading-primary">Stay ahead of the industry by never falling behind</h1>
              <h3 className="heading-tertiary">Certificate management solutions created by workers, for workers</h3>
              <Link to="/signup" className="button button-orange button-video">Sign up now</Link>
            </div>
          </div>
          </div>
        </section>

        <section className="section-banner">
          <div className="landing__left-text-box">
            <h3 className="landing__left-heading">All your certificates, tracked and updated in one place</h3>
          </div>
          <div className="landing__form-container">
            <form>
              <div className="landing__input-container">
                <input className="landing__input" type="email" placeholder="Email Address" id="email" />
                <label className="landing__label" htmlFor="email">Email Address </label>
                <div className="landing__social-container">
                  <h4 className="landing__social-text">Sign up with:</h4>
                  <div className="landing__social-links">
                    <Link to="#" className="ion-social-facebook-outline icon icon-big" />
                    <Link to="#" className="ion-social-twitter-outline icon icon-big" />
                    <Link to="#" className="ion-social-google-outline icon icon-big" />
                    <Link to="#" className="ion-social-linkedin-outline icon icon-big" />
                  </div>
                </div>
              </div>
              
              <div className="landing__button-container">
                <button className="button button-orange" type="submit">Sign up</button>
              </div>
            </form>
          </div>
        </section>

        <section className="section-industries">
            <div className="landing__industries-text-container">
              <h1 className="landing__industries-text"> covering all industries </h1>
            </div>
            <div className="landing__grid-picture landing__grid-picture--1"></div>
            <div className="landing__grid-picture landing__grid-picture--2"></div>
            <div className="landing__grid-picture landing__grid-picture--3"></div>
            <div className="landing__grid-picture landing__grid-picture--4"></div>
        </section>

        <footer className="footer">
          <div className="footer__left">
            <div className="footer__logo-box">
              <Link to="/"><img className="footer__logo" src="img/logo-white.png" /></Link>
            </div>
            <div className="footer__copyright-box">
              <p className="footer__copyright-text"> &copy; 2018 Certify Inc. All rights reserved</p> 
            </div>
          </div>

          <div className="footer__links-container">
            <div className="footer__links-container">
              <ul className="footer__links">
                <li><Link className="footer__link" to="/terms">Terms and conditions</Link></li>
                <li><Link className="footer__link" to="/terms">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="footer__links-container">
              <ul className="footer__links">
                <li><Link to="/about" className="footer__link">About us</Link></li>
                <li><Link to="/product" className="footer__link">Product</Link></li>
                <li><Link to="/pricing" className="footer__link">Pricing</Link></li>
                <li><Link to="/contact" className="footer__link">Contact us</Link></li>
              </ul>
            </div>    
          </div>

        </footer>

      </div>
    );
  }
}

export default Landing
