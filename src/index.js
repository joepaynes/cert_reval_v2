// ==========================================================================
//          REACT, REDUX, COMPONENTS AND OTHER RELATED PACKAGES
// ==========================================================================

// React Setup
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Redux Setup
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

//React-Router Setup
import { Router, Route, Switch } from 'react-router-dom';
import { history } from "./history";

//Components (UP HERE BECAUSE THE IMPORT STATEMENTS HAVE TO BE ABOVE EVERYTHING)

//HOCS
import requireAuth from "./components/require_auth"
//PAGES
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import SignOut from "./components/signout";

// ==========================================================================
//                  FIREBASE, REACT-REDUX-FIREBASE SETUP
// ==========================================================================

import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';
// For the brief auth logic in this file
import 'firebase/auth';

//Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDV03Z9zEAhM1vDRTUKXAhB6oJL0LWLl1M",
    authDomain: "test-v1-673ee.firebaseapp.com",
    databaseURL: "https://test-v1-673ee.firebaseio.com",
    projectId: "test-v1-673ee",
    storageBucket: "test-v1-673ee.appspot.com",
    messagingSenderId: "438970100782"
  }; 

// Initialize an instance of firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// intialize firestore
firebase.firestore();

//Redux firebase config, the nodes that we want to be pulling off of and refering to within the app.
//So for us the each user node will contain shit the certificates and shit.
const reduxFirebaseConfig = {
    userProfile: "users",  // firebase root where the user profiles are stored.
};
// ==========================================================================
//                  REDUX STORE SETUP W/ FIREBASE + FIRESTORE
// ==========================================================================

const newStore = compose (
    applyMiddleware(thunk),
    reactReduxFirebase(firebaseApp, reduxFirebaseConfig),
    reduxFirestore(firebaseApp),
)(createStore)

const store = newStore(reducers);

// ==========================================================================
//                          REACTDOM RENDER
// ==========================================================================

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path ='/' component={Landing} />
                <Route path='/dashboard' component={requireAuth(Dashboard)} />
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path="/signout" component={SignOut} />
            </Switch>
        </Router>
    </Provider>

    ,document.getElementById('root'));
registerServiceWorker();

// ==========================================================================
//                              EXPORTS
// ==========================================================================

export const auth = firebase.auth();
export const db = firebase.firestore();