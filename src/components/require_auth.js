import React, { Component } from "react"
import { history } from "../history"
// Refactor these imports later on? \/
import firebase from 'firebase/app';
import 'firebase/auth';

// USING THE AUTH OBJECT ON FIREBASE.
// HOC that checks whether the user is still persisting or not, if there is no user then
// it redirects the client to the signin screen.

export default function (ComposedComponent) {
    class Authentication extends Component {

        // When component first mounts.
        componentWillMount() {
            var unsubscribe = firebase.auth().onAuthStateChanged(function(user){
                if(!user) {
                    history.push("/signin")
                }
            unsubscribe();
            })
        }

        render() {
        return ( <ComposedComponent {...this.props} /> )
        }
    }
    return Authentication;
}