import React, { Component } from 'react';

import FirebaseContext from '../../context/firebaseContext';

import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import s from './LoginPage.module.scss';

const { Content } = Layout;

class LoginPage extends Component {

  state = {
    register: true,
    error: null
  }

  onFinish = ({ email, password }) => {
    const { register } = this.state;

    register ? this.handleSignIn(email, password) : this.handleSignUp(email, password)
  };

  handleChangeRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: !this.state.register,
      error: null
    })
  }

  handleSignIn = (email, password) => {
    const { signInWithEmail } = this.context;

    signInWithEmail(email, password).then(() => {
      console.log('Sign-in successful.');
      this.setState({
        error: null
      })
    }).catch(error => {
      this.setState({
        error: error.message
      })
    });
  }

  handleSignUp = (email, password) => {
    const { createUserWithEmail } = this.context;

    createUserWithEmail(email, password).then(() => {
      console.log('Sign-up successful.');
      this.setState({
        error: null
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        error: error.message
      })
    });
  }

  render() {
    const { register, error } = this.state;

    return (
      <Layout className={ s.Layout }>
        <Content className={ s.Content }>
          <Form
            className={ s.Form }
            name="basic"
            onFinish={this.onFinish}
          >
            { error ? <Form.Item
              validateStatus='error'
            >
              <div className='has-feedback'>{ error }</div>
            </Form.Item> : null }

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                { register ? 'Войти' : 'Зарегистрироваться'}
              </Button>
              <span className={ s.Register }>
                <span>Или </span>
                <Button 
                  className={ s.Btn }
                  type='link'
                  onClick={ this.handleChangeRegister }>
                  { register ? 'зарегистрироваться' : 'Войти' }
                </Button>
              </span>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

LoginPage.contextType = FirebaseContext;

export default LoginPage;
