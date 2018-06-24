import React, { Component } from 'react';
import { functions } from '../index';

import async from 'async';

class CertBucket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            pass: undefined,
            data: []
        }

        this.fetchData = this.fetchData.bind(this);
        this.renderCerts = this.renderCerts.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const str = id.split('&');
        
        if (this.state.loaded === false ) {
            this.fetchData(str);
        }
    }

    fetchData(str) {
        console.log("fetchData was called");
        let self = this;

        const uid = str[0];
        const key = str[1];

        let IP = undefined;
        let infoIP = undefined;

        const fetchCredentials = functions.httpsCallable('fetchCredentials');

        async.series([
            //1st Task
            function(callback) {

                //Fetch will not work on some versions of IE - Edge Case
                async function getIP() {
                    try {
                        let getIP = await fetch("https://get.geojs.io/v1/ip.json");
                        let passIP = await getIP.json();
                        IP = passIP.ip;
                        callback();
                    } catch(err) {
                        callback(err);
                    }
                }
                getIP();
            }, 
            // End 1st Task

            //2nd Task
            function(callback) {
                async function getInfo() {
                    try {
                        let returnInfo = await fetch(`https://get.geojs.io/v1/ip/geo/${IP}.json`);
                        let passInfo = await returnInfo.json();
                        console.log(passInfo);
                        infoIP = passInfo;
                        callback();
                    } catch(err) {
                        callback(err);
                    }
                }
                getInfo();
            },
            // End 2nd Task

            // 3rd Task
            function(callback) {
                fetchCredentials({uid, infoIP, key})
                .then(res => {
                    console.log(res);
                    if( res.data.pass === true ) {
                    self.setState({data: res.data.certs, loaded: true, pass: true});
                    callback();
                    } else {
                    self.setState({pass: false, loaded: true});
                    alert("You are not authorised to view this data, please generate a new link");
                    callback();
                    }
                })
                .catch(err => {
                    console.log(err);
                    callback(err);
                })
            },
            // End 3rd Task
            
        ], //End Task's Array
        function(err) {
            if(err) {console.log("Async Series Crashed with error: " + err);}
            else {console.log("Finished Async Series");}
        });
    } // End fetchData()

    renderCerts() {
        let certs = this.state.data;
        let display = certs.map(cert=>{
            return (
                <div key={cert.name}>
                    <h3>{cert.name}</h3>
                    <h4>{cert.expiryDate}</h4>
                </div>
            )
        })

        return (
            <div>
                {display}
            </div>
        )
    }

    render() {
        if (this.state.loaded === true && this.state.pass === true ) {
            return (
                <div>
                    {this.renderCerts()}
                </div>
            )
        }
        else {
            if(this.state.pass === false) {
                return (
                    <div>
                        <h1>You are not authorised to view this data, please generate a new link</h1>
                    </div>
                )
            }
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
    }
}

export default CertBucket