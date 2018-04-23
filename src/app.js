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
import Dashboard from "./components/dashboard";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import SignOut from "./components/signout";

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
            holders: [
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", issueDate: "2014-04-23" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", issueDate: "2014-04-23" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", issueDate: "2014-04-23" }
            ]
        })

        batch.set(D001, {
            id: "D001",
            expires: true,
            name: "Seafarer's Medical",
            validity: 2,
            holders: [
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", issueDate: "2017-04-23" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", issueDate: "2017-04-23" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", issueDate: "2017-04-23" }
            ]
        })

        batch.set(D002, {
            id: "D002",
            expires: true,
            name: "Helicopter Underwater Escape Training",
            validity: 2,
            holders: [
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", issueDate: "2017-04-24" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", issueDate: "2017-04-24" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", issueDate: "2017-04-24" }
            ]
        })

        batch.set(D003, {
            id: "D003",
            expires: true,
            name: "HAL Ballast Water Management Training",
            validity: 1,
            holders: [
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", issueDate: "2018-04-25" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", issueDate: "2018-04-25" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", issueDate: "2018-04-25" }
            ]
        })

        batch.set(D004, {
            id: "D004",
            expires: true,
            name: "GMDSS",
            validity: 5,
            holders: [
                { uid: "48zonakRvtN7snhLe4ajE0BAc9t1", issueDate: "2014-04-26" },
                { uid: "WkR7Fz90nVTCHMMeaXNPkVf0GVi2", issueDate: "2014-04-26" },
                { uid: "gmlgzhlve8RvN37g9UqQUXkn28y1", issueDate: "2014-04-26" }
            ]
        })

        batch.set(user1, {
            certificates: [
                { name: "D000", issueDate: "2014-04-22" },
                { name: "D001", issueDate: "2017-04-23" },
                { name: "D002", issueDate: "2017-04-24" },
                { name: "D003", issueDate: "2018-04-25" },
                { name: "D004", issueDate: "2014-04-26" }
            ]
        }, { merge: true });

        batch.set(user2, {
            certificates: [
                { name: "D000", issueDate: "2014-04-22" },
                { name: "D001", issueDate: "2017-04-23" },
                { name: "D002", issueDate: "2017-04-24" },
                { name: "D003", issueDate: "2018-04-25" },
                { name: "D004", issueDate: "2014-04-26" }
            ]
        }, { merge: true });

        batch.set(user3, {
            certificates: [
                { name: "D000", issueDate: "2014-04-22" },
                { name: "D001", issueDate: "2017-04-23" },
                { name: "D002", issueDate: "2017-04-24" },
                { name: "D003", issueDate: "2018-04-25" },
                { name: "D004", issueDate: "2014-04-26" }
            ]
        }, { merge: true });

        batch.commit()
        .then(function() {
            console.log("Document's successfully written!");
            this.setState({ populated: true });
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
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path="/signout" component={SignOut} />
                </Switch>
            </Router>
        )
    }
}

export default App;
