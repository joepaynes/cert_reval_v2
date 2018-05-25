import firebase from 'firebase/app';
import 'firebase/auth';
import { history } from "../history"
import { db } from "../index"

import {
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    USER_UID,
    USER_EMAIL,
    USER_OBJECT,
    USER_LOADED,
    DASH_SELECTED
} from "../actions/types"

// ============================================================================================================
//                                                 AUTH ACTIONS
// ============================================================================================================

export function SignUpUser (values) {
    return function(dispatch) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function(response) {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
        return firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            // ========================
            // SUCCESSFUL SIGNUP LOGIC
            // ========================
            .then(function(response){
                // ========================
                // SUCCESSFUL SIGNUP LOGIC
                // ========================
                // 1) SAVE UID TO STATE 
                values.uid = response.user.uid
                dispatch({ type: USER_UID, payload: values.uid})
                dispatch({ type: USER_EMAIL, payload: values.email})
                return values
            }) //Finish 1st .then of createUserWithEmailAndPassword
            .then(values => {
                let uid = values.uid //Saving to var for str read in doc()
                db.collection("users").doc(uid).set({
                    email: values.email,
                    uid: values.uid,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    industry: values.industry,
                    dob: values.DOB
                })
                // Successful Write
                .then(a => {
                // 1) SWITCH LOADED FLAG TO LOAD INFORMATION TO REDUX STATE
                dispatch({ type: USER_LOADED, payload: false })    
                // 2) PUSH THEM TO THE DASHBOARD
                history.push("/dashboard");
                })
                .catch(function(error){
                    console.log("Document did not write: ", error)
                })
            })
            .catch(function(error){
            console.log(error)
            if(error.code === "auth/email-already-in-use") {
                const alert = "Email already in use - please use another email"
                dispatch(authError(alert));
            }
            }) // END - createUserNameWithEmailAndPassword
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    }
}


export function SignInUser ( {email, password} ) {
    return function(dispatch) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function(response) {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password)
        // ========================
        // SUCCESSFUL SIGNIN LOGIC
        // ========================
        .then(function(response){
            // 1 ) SAVE UID TO USER REDUCER
            let uid = response.user.uid
            dispatch({ type: USER_UID, payload: uid })
            // 2 ) SET USER LOADED FLAG TO FALSE
            dispatch({ type: USER_LOADED, payload: false })    
            // 3) PUSH THEM TO THE DASHBOARD 
            history.push("/dashboard");
        })
        .catch(function(error){
            console.log(error)
            if(error.code === "auth/user-not-found") {
                const alert = "A user does not exist for this email"
                dispatch(authError(alert))
            }
            if(error.code === "auth/wrong-password") {
                const alert = "Incorrect password: passwords are case-sensitive"
                dispatch(authError(alert))
            }
            if(error.code === "auth/argument-error") {
                const alert = "Please fill in both fields"
                dispatch(authError(alert))
            }
        })
    })
    .catch(function(error) {
        console.log(error)
    });
    }
}

export function SignOutUser() {
    return function (dispatch) {
        firebase.auth().signOut()
            .catch(function(error) {
                console.log(error)
            });
        }
    }

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function clearAuthError() {
    return function(dispatch) {
        dispatch({ 
            type: CLEAR_AUTH_ERROR,
            payload: null
        })
    }
}

export function saveToState(obj) {
    let userObject = obj
    return function(dispatch){
        dispatch({
            type: USER_OBJECT,
            payload: userObject
        })
    }
}

export function userLoaded() {
    return function(dispatch) {
        dispatch({
            type: USER_LOADED,
            payload: true
        })
    }
}

export function loadData() {
    return function(dispatch) {
        dispatch({
            type: USER_LOADED,
            payload: false
        })
    }
}

// ============================================================================================================
//                                                 DASH ACTIONS
// ============================================================================================================

export function dashSelected(selected) {
    return function(dispatch) {
        dispatch({
            type: DASH_SELECTED,
            payload: selected
        })
    }
}