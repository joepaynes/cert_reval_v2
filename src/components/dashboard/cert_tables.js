import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { db } from "../../index"

import _ from 'lodash';

import { Edit, Delete } from '../svg/sprites';

class CertTables extends Component {

deleteCertificate(name) {
    console.log(this.props.state.user.instance.certificates)
    let certArray = this.props.state.user.instance.certificates
    let UID = this.props.state.user.instance.uid
    // Find the index number of the cert object by searching for name (can modify search later on)
    let indexNo = _.findIndex(certArray, function(o){return o.name === name})
    // Remove the certificate object from the array.
    certArray.splice(indexNo, 1)
    // Update Database with new array
    db.collection("users").doc(UID).update({"certificates": certArray})
    .then(
    // Switch loading flag to load the new certificate array from db
    this.props.loadData()
    )
}


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

    let certificates = certArr.map(cert => {

        //Default cases for testing purposes
        if (!cert.no) {
            cert.no = 123456789
        }
        if (!cert.issuer) {
            cert.issuer = "Maritime School"
        }
        if (!cert.issueDate) {
            cert.issueDate = "2018-04-25"
        }
        if (!cert.daysToExpire) {
            cert.daysToExpire = 50
        }

        return (
            <tr className="cert">
                {/* NEEDS TO BE THUMBNAIL OF UPLOADED CERTIFICATE OR DEFAULT TO PLACEHOLDER - CHANGE */}
                <td><img className="cert-table__image" src="img/Herb.jpeg"/></td>
                {/* CERT NUMBER OR DEFAULT */}
                <td>{cert.no}</td>
                <td>{cert.name}</td>
                <td>{cert.issuer}</td>
                <td>{cert.issueDate}</td>
                <td>{cert.expiryDate}</td>
                <td>
                    <div className="progress-bar">
                        <div className="progress-bar__text">
                            <div className="progress-bar__text--days">
                                {cert.daysToExpire}
                            </div>
                            <div className="progress-bar__text--dates">
                                {cert.issueDate} - {cert.expiryDate}
                            </div>
                        </div>
                        <div className="progress-bar__bar">
                            {/* FUNCTION HAS TO WRITTEN TO FIND OUT PERCENTAGE OF THE BAR AND DIFFERENT COLORS TO DIFFERENT PERCENTAGES  */}
                            <div className="progress-bar__bar--value" style={{width: "97%"}}>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="align-center">
                    <button className="button-text"><div className="button-text__content"><Edit />Edit</div></button>
                    <button onClick={()=>{self.deleteCertificate(cert.name)}} className="button-text"><div className="button-text__content"><Delete />Delete</div></button>
                    <button onClick={() => {self.fetchFile(cert.fileName);}} className="button-text"><div className="button-text__content">Download</div></button>
                </td>
            </tr>
        )
    })
    // THIS IS THE RETURN STATEMENT THAT RETURNS ALL THE CERTIFICATES IN A LIST.
    return (
        <tbody>
            {certificates}
        </tbody>
    )

}
            
render() {
    return (
    <section className="certificate-table-container">
        <div className="certificate-table-container__header">
            <h1 className="header-primary">STCW</h1>
        </div>
        <table className="cert-table">
            <thead>
                <tr className="cert-table__header">
                    <th></th>
                    <th>No:</th>
                    <th>Name:</th>
                    <th>Issuer:</th>
                    <th>Issue Date</th>
                    <th>Expiry Date</th>
                    <th>Days to expiry</th>
                    <th></th>
                </tr>
            </thead>
            {this.renderCertificates()}
        </table>
    </section>
    )
}

}

function mapStateToProps(state) {
    return {
        user: state.user,
        state: state   
    }
}

export default connect(mapStateToProps, actions)(CertTables)