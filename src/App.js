import React, { Component } from 'react';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

import { PrivateRoute } from './utils/privateRoute';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUserAction } from './actions/userAction';

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

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    const { history, addUser, userUid } = this.props;

    auth.onAuthStateChanged(user => {
      if (user && !userUid) {
        setUserUid(user.uid);
        localStorage.setItem('user', JSON.stringify(user.uid));
        addUser(user);
        history.push('/');
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
      }
    })
  }

  render() {
    const { userUid } = this.props;

    if (userUid === undefined) {
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

const mapStateToProps = (state) => {
  return {
    userUid: state.user.userUid
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addUser: addUserAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));