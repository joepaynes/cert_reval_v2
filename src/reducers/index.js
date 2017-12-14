import { combineReducers } from 'redux';

//Reducers
//Implementing firebasestateReducer and firestoreReducer into the the combine reducers call.
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore' 
//Implementing reduxForm form reducer into the combine reducers call.
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth_reducer';
import CertReducer from './cert_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    cert: CertReducer,
    firebase: firebaseStateReducer,
    firestore: firestoreReducer
});
  
export default rootReducer;
