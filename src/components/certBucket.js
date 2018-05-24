import React, { Component } from 'react';
import { functions } from '../index';

import rp from 'request-promise';
import async from 'async';

class CertBucket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const str = id.split('&');

        console.log(str);
        
        this.fetchData(str);
    }

    fetchData(str) {
        const uid = str[0];
        const key = str[1];

        let ip = ""
        let geoIp = ""

        const fetchCertBucket = functions.httpsCallable('fetchCertBucket');

        async.series([
            //1st Task
            function(callback) {
                rp({url: "https://get.geojs.io/v1/ip.json", json: true})
                .then(res => {
                    ip = res.ip
                    callback(); // Exit First Task
                })
            }, 
            // End 1st Task

            //2nd Task
            function(callback) {
                rp({url: `https://get.geojs.io/v1/ip/geo/${ip}.json`, json: true})
                .then(res => {
                    geoIp = res;
                    console.log(res);
                    callback();
                })
            },
            // End 2nd Task

            // 3rd Task
            function(callback) {
                fetchCertBucket({uid, key, geoIp})
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            }
            // End 3rd Task
            
        ], //End Task's Array
        function(err) {
            if(err) {console.log(err)}
            console.log("Finished Async Series");
        });
    } // End fetchData()


    render() {
        return (
            <div>Hello World</div>
        )
    }
}

export default CertBucket