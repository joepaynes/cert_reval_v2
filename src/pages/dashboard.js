import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { db, storageBucket } from "../index";
import _ from "lodash";
import * as actions from "../actions";


import Header from '../components/dashboard/header';
import SideBar from '../components/dashboard/sidebar';
import WidgetBoard from '../components/dashboard/widgetboard';
import CertTables from '../components/dashboard/cert_tables';
import CertCards from '../components/dashboard/cert_cards';
import Loader from '../components/loader';
import CertWizard from "../components/certWizard";
import Tracker from "../components/dashboard/tracker";

// MOCK UP COMPONENT

class Dashboard extends Component {

    constructor(props) {
        super(props)
        // Loading state will have to be completely relient on redux state, maybe have an initial load and then another load that says when
        // the user object has been loaded. In fact you might only need one control from redux state, and different components can flag
        // loading states when starting and ending operations, like updating, reading and writing to the database etc.

        //Certificate Views
        this.toggleTable = this.toggleTable.bind(this)
        this.toggleCards = this.toggleCards.bind(this)
        this.view = this.view.bind(this)

        //Certificate Methods - Delete, Edit, Delete
        this.deleteCertificate = this.deleteCertificate.bind(this);
        this.downloadCertificate = this.downloadCertificate.bind(this);
        this.addCert = this.addCert.bind(this);

        this.state = {
            view: "table"
        }
    }

    componentWillMount() {
         // Only run fetchdata if the dashboard is in loading state AND data hasn't been previously saved to redux state
         console.log(this.props)
         if (this.props.user.loaded === false) {
            this.fetchData()
        }
    }

    componentWillUpdate(nextProps) {
        // Will run when adding, deleting, or modifying a certificate.
        if (nextProps.user.loaded === false) {
           this.fetchData()
       }
    }


    render() {
        if (this.props.user.loaded === true) {  
            // REF \/
            let user = this.props.user.instance
            return (
                <div className="dashboard">
                    {/* Dashboard Component */}
                    <div className="dashboard__container">
                     {/* Header Component*/} 
                        <Header />
                        <div className="content">
                            <SideBar />
                            <div className="dashboard__view">
                            {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<Loader />)
        } 

    }

    addCert() {
        this.props.dashSelected("add-certificate");
    }

    toggleTable() {
        this.setState({
            view: "table"
        })
    }

    toggleCards() {
        this.setState({
            view: "cards"
        })
    }

    view () {
        let self = this;
        if (self.state.view === "table") {
            return (
                <CertTables delete={this.deleteCertificate} download={this.downloadCertificate} />
            )
        }
        if (self.state.view === "cards") {
            return (
                <CertCards delete={this.deleteCertificate} download={this.downloadCertificate}/>
            )
        }
    }

    renderContent() {
        if(this.props.dash.selected === "home") {
            return (
                <div>
                    <WidgetBoard />
                    <button onClick={this.toggleTable}>table</button> 
                    <button onClick={this.toggleCards}>cards</button>
                    <button onClick={this.addCert}>Add Certificate</button>
                    {this.view()}
                </div>
            )
        }

        if(this.props.dash.selected === "add-certificate") {
            return (
                <CertWizard/> 
            )
        }

        if(this.props.dash.selected === "tracker") {
            return (
                <Tracker /> 
            )
        }
    }

    // ============================================
    // Certificate Methods - Edit, Delete, Download
    // ============================================

    deleteCertificate(name) {
        let certArray = this.props.user.instance.certificates
        let UID = this.props.user.instance.uid
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

    downloadCertificate(fileName) {
        let uid = this.props.user.uid;

        let root = storageBucket.ref();
        root.child(`${uid}/${fileName}`).getDownloadURL()
        .then(url => {
            //Begin Download once URL returned
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = event => {
                let blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch(error => {
            if(error.code === 404) {
                alert(error.message);
            }
            alert("Download failed: " + error.code + " | " + error.message);
        })
    }

    // ============================================
    // END of Certificate Methods
    // ============================================
    
    fetchData() {
        let uid = this.props.user.uid; //Grabs uid from redux state
        // USER QUERY
        db.collection("users").doc(uid).get()
        .then(doc => {
                let userObject = doc.data()
                // Save data to redux state
                this.props.saveToState(userObject) // Saves data to user.instance
                this.props.userLoaded() // Flips user.loaded to true
        })
        .catch(function(error){
            console.log("Error fetching data, ", error)
        })
    }
}

function mapStateToProps(state) {
    return {
        dash: state.dash,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(Dashboard)


