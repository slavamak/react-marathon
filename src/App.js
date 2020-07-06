import React, { Component } from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import FirebaseContext from './context/firebaseContext';

import { Spin } from 'antd';

import 'antd/lib/layout/style/index.css';
import 'antd/lib/space/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/spin/style/index.css';

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const { auth, setUserUid } = this.context;

    auth.onAuthStateChanged(user => {
      if (user) {
        setUserUid(user.uid);

        this.setState({
          user
        })
      } else {
        setUserUid(null);

        this.setState({
          user: false
        })
      }
    })
  }

  render() {
    const { user } = this.state;

    if (user === null) {
      return (
        <div className='loader'>
          <Spin size='large' />
        </div>
      );
    }

    return (
      <React.Fragment>
        { user ? <HomePage /> : <LoginPage /> }
      </React.Fragment>
    )
  }
}

App.contextType = FirebaseContext;

export default App;