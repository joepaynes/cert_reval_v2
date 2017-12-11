import { combineReducers } from 'redux';

//Reducers
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import CertReducer from './cert_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    cert: CertReducer
});
  
export default rootReducer;
