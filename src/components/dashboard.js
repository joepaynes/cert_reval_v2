import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { db, storageBucket } from "../index"
import moment from "moment";
import _ from "lodash";
import * as actions from "../actions";

import { 
    USER_OBJECT
 } from "../actions/types"

import IntroScreen from "./intro"
import Loader from "./loader"
import CertWizard from "./certWizard"
import Tracker from "./tracker"

// MOCK UP COMPONENT

class Dashboard extends Component {

    constructor(props) {
        super(props)


        // Loading state will have to be completely relient on redux state, maybe have an initial load and then another load that says when
        // the user object has been loaded. In fact you might only need one control from redux state, and different components can flag
        // loading states when starting and ending operations, like updating, reading and writing to the database etc.


        this.handleClickHome = this.handleClickHome.bind(this)
        this.handleClickAddCert = this.handleClickAddCert.bind(this)
        this.handleClickTracker = this.handleClickTracker.bind(this)
        this.fetchFile = this.fetchFile.bind(this)
    }

    componentDidMount() {
         // Only run fetchdata if the dashboard is in loading state AND data hasn't been previously saved to redux state
         console.log(this.props.user.loaded)
         if (this.props.user.loaded === false) {
            this.fetchData()
            return ( <Loader/> )  
        }
    }

    componentWillUpdate(nextProps) {
        // Will run when adding, deleting, or modifying a certificate.
        if (nextProps.user.loaded === false) {
           this.fetchData()
           return ( <Loader/> )  
       }
    }


    render() {
        if(this.props.intro === true) {
            return(<IntroScreen/>)
        }
        else if (this.props.user.loaded === true) {  
            // REF \/
            let user = this.props.user.instance
            return (
                <div className="dashboard">
                    <div className="dashboard__header clearfix">
                        <div className="dashboard__header__profile-box">
                            {user.firstname} {user.lastname}   
                        </div>
                        <div className="dashboard__header__links-box">
                            <ul className="header__links-list">
                                <Link to="/" className="header__link">Home</Link>
                                <Link to="/signout" className="header__link">Sign Out</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="side-menu">
                        <div className="side-menu__logo-box">
                            <img className="side-menu__logo" src="img/logo-white.png"/>
                        </div>
                        <div className="side-menu__links-container">
                            <ul className="side-menu__links-list">
                                <li className="side-menu__link"><button onClick={this.handleClickHome} className="side-menu__link--button"> Home </button></li>
                                <li className="side-menu__link"><button onClick={this.handleClickAddCert} className="side-menu__link--button"> Add Certificate </button> </li>
                                <li className="side-menu__link"><button onClick={this.handleClickTracker} className="side-menu__link--button"> Tracker </button> </li>
                            </ul>
                        </div>


                    </div>
                    <div className="dashboard__content-container">
                        {this.renderContent()}
                    </div>
                </div>
            )
        }
        else {
            return (<Loader />)
        } 

    }

    renderContent() {
        if(this.props.dash.selected === "home") {
            let certArr = this.props.state.user.instance.certificates
            let self = this


            if(certArr == undefined) {
                return (
                    <div>No Certificates</div>
                )
            }
            // Map through certificate array to pull out and display certificate objects
            let certs = certArr.map(function(cert){
               return(
                <div className="certificate" key={cert.name}>
                    <h2>{cert.name}</h2>
                    <h3>{cert.issueDate}</h3>
                    <button onClick={() => {
                        // ===============
                        // Delete Function
                        // ===============
                        console.log(self.props.state.user.instance.certificates)
                        let certArray = self.props.state.user.instance.certificates
                        let UID = self.props.state.user.instance.uid
                        // Find the index number of the cert object by searching for name (can modify search later on)
                        let indexNo = _.findIndex(certArray, function(o){return o.name === cert.name})
                        // Remove the certificate object from the array.
                        certArray.splice(indexNo, 1)
                        // Update Database with new array
                        db.collection("users").doc(UID).update({
                            "certificates": certArray
                        }).then(
                            // Switch loading flag to load the new certificate array from db
                            self.props.loadData()
                        )

                    }}> Delete </button>
                    {/* ++++++++++++++++ */}
                    {/* DOWNLOAD BUTTON */}
                    {/* ++++++++++++++++ */}
                    <button onClick={() => {
                        self.fetchFile(cert.fileName);
                    }}> Download </button>
                </div>
               )
            })
            return (
                <div>{certs}</div>
            );
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

    fetchFile(fileName) {
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
            if(error.code == 404) {
                alert(error.message);
            }
            console.log("Download failed: " + error.code + error.message);
        })
    }
    
    fetchData() {
        let uid = this.props.user.uid

        // USER QUERY
        db.collection("users").doc(uid).get()
        .then(doc => {
                let userObject = doc.data()
                // Save data to redux state
                this.props.saveToState(userObject)
                this.props.userLoaded()
        })
        .catch(function(error){
            console.log("Error fetching data, ", error)
        })
    }

    handleClickHome() {
        this.props.dashSelected("home");
    }
    handleClickAddCert() {
        this.props.dashSelected("add-certificate");
    }
    handleClickTracker() {
        this.props.dashSelected("tracker");
    }
}

function mapStateToProps(state) {
    return {
        intro: state.intro.intro,
        user: state.user,
        dash: state.dash,
        state: state   
    }
}

export default connect(mapStateToProps, actions)(Dashboard)


