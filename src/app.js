import React, { Component } from 'react'

//React-Router Setup
import { Router, Route, Switch } from 'react-router-dom';
import { history } from "./history"

//Components (UP HERE BECAUSE THE IMPORT STATEMENTS HAVE TO BE ABOVE EVERYTHING)

//HOCS
import requireAuth from "./components/require_auth"
//PAGES
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import SignOut from "./components/signout";

class App extends Component {
    
    render() {
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
