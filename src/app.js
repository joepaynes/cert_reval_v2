import React, { Component } from 'react'

//React-Router Setup
import { Router, Route, Switch } from 'react-router-dom';
import { history } from "./history"

//Components (UP HERE BECAUSE THE IMPORT STATEMENTS HAVE TO BE ABOVE EVERYTHING)
import { db } from "./index"

//HOCS
import requireAuth from "./components/require_auth"
//PAGES
import Landing from "./components/landing";
import Dashboard from "./pages/dashboard";
import Entrance from "./pages/entrance";
import SignOut from "./pages/signout";
import CertBucket from "./pages/certBucket";
import NoMatch from "./pages/404";

class App extends Component {
    //State for DB Populate for testing
    constructor(props) {
        super(props)
        this.state = {
            populated: false
        }

    }

    populateDB() {
        let batch = db.batch();
        let self = this;

        //D000
        let D000 = db.collection("certs").doc("D000");
        let D001 = db.collection("certs").doc("D001");
        let D002 = db.collection("certs").doc("D002");
        let D003 = db.collection("certs").doc("D003");
        let D004 = db.collection("certs").doc("D004");

        let user1 = db.collection("users").doc("48zonakRvtN7snhLe4ajE0BAc9t1");
        let user2 = db.collection("users").doc("WkR7Fz90nVTCHMMeaXNPkVf0GVi2");
        let user3 = db.collection("users").doc("gmlgzhlve8RvN37g9UqQUXkn28y1");

        batch.set(D000, {
            id: "D000",
            expires: true,
            name: "Certificate of Competency",
            validity: 5,
            holders: [ // Dates for expiry in one year
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", expiryDate: "2019-06-20" },
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", expiryDate: "2019-06-20" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", expiryDate: "2019-06-20" }
            ]
        })

        batch.set(D001, {
            id: "D001",
            expires: true,
            name: "Seafarer's Medical",
            validity: 2,
            holders: [ // Dates for expiry in six months
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", expiryDate: "2018-12-21" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", expiryDate: "2018-12-21" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", expiryDate: "2018-12-21" }
            ]
        })

        batch.set(D002, {
            id: "D002",
            expires: true,
            name: "Helicopter Underwater Escape Training",
            validity: 2,
            holders: [ // Dates for expiry in one year
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", expiryDate: "2019-06-22" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", expiryDate: "2019-06-22" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", expiryDate: "2019-06-22" }
            ]
        })

        batch.set(D003, {
            id: "D003",
            expires: true,
            name: "HAL Ballast Water Management Training",
            validity: 1,
            holders: [ // Dates for expiry in three months
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", expiryDate: "2018-09-23" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", expiryDate: "2018-09-23" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", expiryDate: "2018-09-23" }
            ]
        })

        batch.set(D004, {
            id: "D004",
            expires: true,
            name: "GMDSS",
            validity: 5,
            holders: [ // Dates for expiry in two years
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", expiryDate: "2020-06-24" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", expiryDate: "2020-06-24" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", expiryDate: "2020-06-24" }
            ]
        })

        batch.set(user1, {
            certificates: [
                { name: "D000", issueDate: "2013-06-20", no: "1234", expiryDate: "2018-06-20" },
                { name: "D001", issueDate: "2014-06-20", no: "1235", expiryDate: "2020-06-20" },
                { name: "D002", issueDate: "2015-06-20", no: "1236", expiryDate: "2019-06-20" },
                { name: "D003", issueDate: "2016-06-20", no: "1237", expiryDate: "2020-06-20" },
                { name: "D004", issueDate: "2017-06-20", no: "1238", expiryDate: "2019-06-20" }
            ],
            email: "bennypayne12@gmail.com"
        }, { merge: true });

        batch.set(user2, {
            certificates: [
                { name: "D000", issueDate: "2013-06-20", no: "1234", expiryDate: "2018-06-20" },
                { name: "D001", issueDate: "2014-06-20", no: "1235", expiryDate: "2020-06-20" },
                { name: "D002", issueDate: "2015-06-20", no: "1236", expiryDate: "2019-06-20" },
                { name: "D003", issueDate: "2016-06-20", no: "1237", expiryDate: "2020-06-20" },
                { name: "D004", issueDate: "2017-06-20", no: "1238", expiryDate: "2019-06-20" }
            ],
            email: "payne.joe@hotmail.co.nz"
        }, { merge: true });

        batch.set(user3, {
            certificates: [
                { name: "D000", issueDate: "2013-06-20", no: "1234", expiryDate: "2018-06-20" },
                { name: "D001", issueDate: "2014-06-20", no: "1235", expiryDate: "2020-06-20" },
                { name: "D002", issueDate: "2015-06-20", no: "1236", expiryDate: "2019-06-20" },
                { name: "D003", issueDate: "2016-06-20", no: "1237", expiryDate: "2020-06-20" },
                { name: "D004", issueDate: "2017-06-20", no: "1238", expiryDate: "2019-06-20" }
            ],
            email: "paynejosephanthony@gmail.com"
        }, { merge: true });

        batch.commit()
        .then(function() {
            console.log("Document's successfully written!");
            self.setState({ populated: true });
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    
    render() {
        if (this.state.populated === false) {
            this.populateDB();
            
        }
    
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path ='/' component={Landing} />
                    <Route path='/dashboard' component={requireAuth(Dashboard)} />
                    <Route path='/:direction(signin|signup)' component={Entrance} />
                    <Route path="/signout" component={SignOut} />
                    <Route path="/certBucket/:id" component={CertBucket} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        )
    }
}

export default App;
