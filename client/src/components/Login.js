import React, { Component } from 'react';
import { Layout, Card, FormLayout, TextField, Checkbox, ButtonGroup, Button } from '@shopify/polaris';

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    remember: false
  };

  handleChangeUsername = (username) => {
    this.setState({ username });
  };
  handleChangePassword = (password) => {
    this.setState({ password });
  };
  handleChangeRemember = (remember) => {
    this.setState({ remember });
  };

  handleLogin = () => { this.props.history.push('/app'); };
  handleForgotPassword = () => { this.props.history.push('/password'); };

  render() {
    return (
      <Layout sectioned>
        <Layout.AnnotatedSection
          title="Already Registered?"
          description="Log into your account and get crackin!">
          <Card>
            <Card.Section>
              <FormLayout>
                <TextField
                  type="email"
                  label="Email or Username"
                  placeholder="jesse.sunshine@gmail.com"
                  value={this.state.username}
                  onChange={this.handleChangeUsername}
                />
                <TextField
                  type="password"
                  label="Password"
                  placeholder="*******"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                <div className="custom__checkboxPosition">
                  <Checkbox
                    checked={this.state.remember}
                    label="Remember Me"
                    onChange={this.handleChangeRemember} />
                </div>
              </FormLayout>
            </Card.Section>
            <div className="Polaris-Card__Footer">
              <ButtonGroup>
                <Button primary onClick={this.handleLogin}>Log-In</Button>
                <Button plain size="small" onClick={this.handleForgotPassword}>Forgot Password</Button>
              </ButtonGroup>
            </div>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    );
  }
}


