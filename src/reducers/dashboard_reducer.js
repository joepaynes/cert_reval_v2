import {
    DASH_SELECTED
} from "../actions/types"

export default function (state = {selected: "home"}, action) {
    switch(action.type) {
        case DASH_SELECTED:
            return {...state, selected: action.payload}
    }
    return state
}