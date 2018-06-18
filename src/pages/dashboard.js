import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { db, storageBucket } from "../index"
import _ from "lodash";
import * as actions from "../actions";


import Header from '../components/dashboard/header';
import SideBar from '../components/dashboard/sidebar';
import WidgetBoard from '../components/dashboard/widgetboard';
import CertTables from '../components/dashboard/cert_tables';
import CertCards from '../components/dashboard/cert_cards';
import Loader from '../components/loader';
import CertWizard from "../components/certWizard";

// MOCK UP COMPONENT

class Dashboard extends Component {

    constructor(props) {
        super(props)
        // Loading state will have to be completely relient on redux state, maybe have an initial load and then another load that says when
        // the user object has been loaded. In fact you might only need one control from redux state, and different components can flag
        // loading states when starting and ending operations, like updating, reading and writing to the database etc.
        this.handleClickHome = this.handleClickHome.bind(this)
        this.handleClickAddCert = this.handleClickAddCert.bind(this)
        this.fetchFile = this.fetchFile.bind(this)
        this.toggleTable = this.toggleTable.bind(this)
        this.toggleCards = this.toggleCards.bind(this)
        
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
                            <WidgetBoard />
                            <button onClick={this.toggleTable}>table</button> 
                            <button onClick={this.toggleCards}>cards</button>
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

    renderContent() {
        let self = this;
        if(this.props.dash.selected === "home") {
            if (self.state.view === "table") {
                return (
                    <CertTables/>
                )
            }
            if (self.state.view === "cards") {
                return (
                    <CertCards/>
                )
            }
            return 
        }

        if(this.props.dash.selected === "add-certificate") {
            return (
                <CertWizard/> 
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
            if(error.code === 404) {
                alert(error.message);
            }
            console.log("Download failed: " + error.code + error.message);
        })
    }
    
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

    handleClickHome() {
        this.props.dashSelected("home");
    }
    handleClickAddCert() {
        this.props.dashSelected("add-certificate");
    }
}

function mapStateToProps(state) {
    return {
        dash: state.dash,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(Dashboard)


