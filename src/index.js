import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';

import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import App from './App';

ReactDOM.render(<FirebaseContext.Provider value={ new Firebase() }><App /></FirebaseContext.Provider>, document.getElementById('root'));