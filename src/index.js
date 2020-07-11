import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import combineReducers from './reducers';

import 'antd/lib/space/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/spin/style/index.css';
import './styles/index.scss';

import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';

import App from './App';

const store = createStore(combineReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={ new Firebase() }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);