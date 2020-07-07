import React, { Component } from 'react';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

import { PrivateRoute } from './utils/privateRoute';

import FirebaseContext from './context/firebaseContext';

import { Spin } from 'antd';

const About = () => {
  return (
    <Layout>
      <p>About me</p>
    </Layout>
  )
}

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    const { history } = this.props;

    auth.onAuthStateChanged(user => {
      if (user && !this.state.user) {
        setUserUid(user.uid);
        localStorage.setItem('user', JSON.stringify(user.uid));
        this.setState({ user });
        history.push('/');
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
        this.setState({ user: false })
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
        <Switch>
          <Route path='/login' component={ LoginPage } />
          <Route render={() => {
            return (
              <Switch>
                <PrivateRoute exact path='/' component={ HomePage } />
                <PrivateRoute path='/about' component={ About } />
                <Redirect to='/' />
              </Switch>
            )
          }} />
        </Switch>
    )
  }
}

App.contextType = FirebaseContext;

export default withRouter(App);