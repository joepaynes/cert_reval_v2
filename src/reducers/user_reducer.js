// Idea, for now anyway, is to keep all the users information inside of a reducer so that the app has to load once.
// Then we pull data from the reducer rather than always from the db.

// USER TYPES:
import {
    USER_UID,
    USER_OBJECT,
    USER_EMAIL,
    USER_LOADED
} from "../actions/types"

export default function(state = {}, action) {
    switch(action.type) {
        case USER_UID:
            return {...state, uid: action.payload }
        case USER_OBJECT:
            return {...state, instance: action.payload }
        case USER_LOADED:
            return {...state, loaded: action.payload }
        case USER_EMAIL:
            return {...state, email: action.payload }
        }
        
    return state
}
