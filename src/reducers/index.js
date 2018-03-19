import { combineReducers } from 'redux';

//===================
// Reducers
//===================

// VENDOR REDUCERS
// Implementing reduxForm form reducer into the combine reducers call.
import { reducer as formReducer } from 'redux-form';

// ORIGINAL REDUCERS (MADE BY US)
import AuthReducer from './auth_reducer';
import CertReducer from './cert_reducer';
import UserReducer from './user_reducer';
import IntroReducer from "./intro_reducer";

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    cert: CertReducer,
    user: UserReducer,
    intro: IntroReducer,
});
  
export default rootReducer;
