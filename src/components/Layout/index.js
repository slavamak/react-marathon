import React, { Component } from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

import FirebaseContext from '../../context/firebaseContext';

import { Button } from 'antd';
import { TranslationOutlined, LogoutOutlined } from '@ant-design/icons';

class Layout extends Component {

  handleSignOut = () => {
    const { auth } = this.context;
    const { history } = this.props;

    auth.signOut().then(() => {
      console.log('Sign-out successful.');
      localStorage.removeItem('user');
      history.push('/');
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Header>
          <Logo url='/' width='auto'>
            <TranslationOutlined style={{ fontSize: '64px', color: '#fff' }} />
          </Logo>
          <Nav />
          <Button 
            shape='round'
            icon={<LogoutOutlined />}
            size='large'
            onClick={ this.handleSignOut }
          >
            Выйти
          </Button>
        </Header>
        <main>
          { children }
        </main>
        <Footer>
          <p style={{textAlign: 'right'}}>React Marathon © 2020</p>
        </Footer>
      </React.Fragment>
    )
  }
}

Layout.contextType = FirebaseContext;

export default Layout;