// React Setup
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Redux Setup
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

//React-Router Setup
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//Components
import Landing from 


ReactDOM.render(

    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <Switch>
                <Route exact path ='/' component={Landing} >
                <Route path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
