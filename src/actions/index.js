import firebase from 'firebase/app';
import 'firebase/auth';
import history from "../history"


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
        // SAVE USERS UID TO LOCAL STORAGE TO USE TO THEN WRITE TO FIRESTORE
            localStorage.setItem("UID", response.uid)
        // PUSH THEM TO THE DASHBOARD
            history.push("/dashboard");
      })
      .catch(function(error){
          console.log(error);
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
          console.log(error);
      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
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

