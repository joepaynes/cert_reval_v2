import { combineReducers } from 'redux';

//===================
// Reducers
//===================

// VENDOR REDUCERS
// Implementing reduxForm form reducer into the combine reducers call.
import { reducer as formReducer } from 'redux-form';

// ORIGINAL REDUCERS (MADE BY US)
import AuthReducer from './auth_reducer';
import DashboardReducer from './dashboard_reducer';
import UserReducer from './user_reducer';
import IntroReducer from "./intro_reducer";

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    user: UserReducer,
    intro: IntroReducer,
    dash: DashboardReducer
});
  
export default rootReducer;
