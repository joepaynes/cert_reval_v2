import React, { Component } from 'react';
import { Edit, Delete } from "../svg/sprites"
import { connect } from "react-redux";
import * as actions from "../../actions"

class CertCards extends Component {

    renderCertificates() {
        //Pulls instance from Redux State
        let certArr = this.props.state.user.instance.certificates 
        // Binds this to function scope. 
        let self = this

        //Will return a blank or "first-use" table when user has no certificates
        if(certArr === undefined) {
            return (
                <div>No Certificates</div>
            )
        }
        let cards = certArr.map(cert => {

            return (
                <li className="cards__item">
                    <div className="card" key={cert.no}>
                        <div className="card__header">
                            <h1 className="header-primary">STCW</h1>
                            <div className="card__buttons">
                                <button className="button-text button-text-card"><div className="button-text__content"><Edit/>Edit</div></button>
                                <button className="button-text button-text-card"><div className="button-text__content"><Delete/>Delete</div></button>
                            </div>
                        </div>
                        <div className="card__content">
                            <div className="card__content-name-date">
                                <h3 className="card__info card__info-name"><span className="card__info-header">Name:</span><br/>{cert.name}</h3>
                                <h3 className="card__info"><span className="card__info-header">No: </span><br/>{cert.no}</h3>
                            </div>
                            <h3 className="card__info"><span className="card__info-header">Issuer: </span><br/>{cert.issuer}</h3>
                        </div>
                        <div className="card__footer">
                            <div className="progress-bar">
                                <div className="progress-bar__text">
                                    <div className="progress-bar__text--days progress-bar__text--days--card">
                                        {/* FUNCTION HERE TO CALCULATE DAYS*/}
                                        50 Days
                                    </div>
                                    <div className="progress-bar__text--dates progress-bar__text--dates--card">
                                        {cert.issueDate} - {cert.expiryDate}
                                    </div>
                                </div>
                                <div className="progress-bar__bar progress-bar__bar--card">
                                    <div className="progress-bar__bar--value progress-bar__bar--value--card" style={{width: "97%"}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
        // THIS IS THE RETURN STATEMENT THAT RETURNS ALL THE CERTIFICATES IN A LIST.
        return (
            <ul className="cards">
                {cards}
            </ul>
        )
    }

    render() {
        return (
        <section className="certificate-cards-container">
            {this.renderCertificates()}
        </section>
        )
    }
}

function MapStateToProps(state) {
    return {
        user: state.user,
        state: state   
    }
}



export default connect(MapStateToProps, actions)(CertCards);