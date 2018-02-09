import firebase from 'firebase/app';
import 'firebase/auth';
import { history } from "../history"
import { db } from "../index"

import {
    AUTH_ERROR,
    CLEAR_AUTH_ERROR
} from "../actions/types"

// ============================================================================================================
//                                                 AUTH ACTIONS
// ============================================================================================================

export function SignUpUser ( {email, password} ) {
    return function(dispatch) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function(response) {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        // MAKE A DOCUMENT IN THE USER COLLECTION WITH THE USER'S UID IN AS THE DOCUMENT 
        // AND THEIR EMAIL ADDRESS AS THE FIRST ENTRY.
            let email = response.email;
            let UID = response.uid
            db.collection("users").doc(UID).set({
                email: email,
                UID: UID,
            });
        // PUSH THEM TO THE DASHBOARD
            history.push("/dashboard");
      })
      .catch(function(error){
          console.log(error)
          if(error.code === "auth/email-already-in-use") {
              const alert = "Email already in use - please use another email"
              dispatch(authError(alert));
          }
      })
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
      .then(function(response){
        // SAVE USERS UID TO LOCAL STORAGE TO USE TO THEN WRITE TO FIRESTORE
            localStorage.setItem("UID", response.uid)
        // PUSH THEM TO THE DASHBOARD
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

