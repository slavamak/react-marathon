import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/lib/layout/style/index.css';
import 'antd/lib/space/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/spin/style/index.css';
import './styles/index.scss';

import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';
import App from './App';

ReactDOM.render(
  <FirebaseContext.Provider value={ new Firebase() }>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);