// ==========================================================================
// REACT, REDUX, COMPONENTS AND OTHER RELATED PACKAGES
// ==========================================================================

// React Setup
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Components
import App from "./app"
import Loader from "./components/loader"

// Firebase and Firestore
import firebase from 'firebase';
import 'firebase/firestore';

// Redux Setup
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

// Redux Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

// ==========================================================================
// REDUX STORE SETUP 
// ==========================================================================

    const persistConfig = {
        key: "root",
        storage,
        debug: true,
    }

    const persistedReducer = persistReducer(persistConfig, reducers);
    const storeEnhancer = compose(applyMiddleware(thunk));
    let store = createStore(persistedReducer, storeEnhancer)
    let persistor = persistStore(store)
// ==========================================================================
// FIREBASE, FIRESTORE SETUP
// ==========================================================================

//Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDV03Z9zEAhM1vDRTUKXAhB6oJL0LWLl1M",
    authDomain: "test-v1-673ee.firebaseapp.com",
    databaseURL: "https://test-v1-673ee.firebaseio.com",
    projectId: "test-v1-673ee",
    storageBucket: "test-v1-673ee.appspot.com",
    messagingSenderId: "438970100782"
  }; 

// Initialize an instance of firebase
firebase.initializeApp(firebaseConfig);

// intialize firestore
firebase.firestore();

// ==========================================================================
// REACTDOM RENDER
// ==========================================================================

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <App /> 
        </PersistGate>
    </Provider>
    ,document.getElementById('root'));
registerServiceWorker();

// ==========================================================================
//                              EXPORTS
// ==========================================================================

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storageBucket = firebase.storage();
export const functions = firebase.functions();
export let savedStore = persistor;