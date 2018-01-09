// Implement React-Redux-Firebase to listen for Auth changes, this binds the User's unquie Auth instance ("ref") to this reducers state.
// Causing the Application (Redux) State to update if there are changes.
// Example: User returns to site without loggin out -- sessions

// Placeholder while we figure this shit out

import {
    AUTH_USER,
    UNAUTH_USER
} from "../actions/types"

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, authenticated: true}
        case UNAUTH_USER:
            return {...state, authenticated: false}
    }
    return state;
}

