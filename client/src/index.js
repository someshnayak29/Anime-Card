import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';//provider keeps track of store i.e. global state and access it
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));//boiler plate code to create a redux store

// now that our store is created we can wrap our application with a provider component, so that it can use store
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>
        <App />
    </Provider>
);
