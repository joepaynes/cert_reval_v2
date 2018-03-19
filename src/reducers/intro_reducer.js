import {
    INTRO_ACTIVE,
    INTRO_UNACTIVE
} from "../actions/types"

export default function (state = {}, action) {
    switch(action.type) {
        case INTRO_ACTIVE:
            return {...state, intro: true}
        case INTRO_UNACTIVE:
            return {...state, intro: false}
    }
    return state
}