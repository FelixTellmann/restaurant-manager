import React, { Component } from 'react';
import { Layout, Card, FormLayout, TextField, ButtonGroup, Button } from '@shopify/polaris';

export default class Register extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleChangeFirstName = (firstname) => {
    this.setState({ firstname });
  };

  handleChangeLastName = (lastname) => {
    this.setState({ lastname });
  };

  handleChangeEmail = (email) => {
    this.setState({ email });
  };

  handleChangePassword = (password) => {
    this.setState({ password });
  };

  handleChangeConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword });
  };


  render() {
    return (
      <Layout sectioned>
        <Layout.AnnotatedSection
          title="Register Now"
          description="Setup Your Account in just a few minutes">
          <Card>
            <Card.Section>
              <FormLayout>
                <TextField
                  type="text"
                  label="First Name"
                  placeholder="Jesse"
                  value={this.state.firstname}
                  onChange={this.handleChangeFirstName}
                />
                <TextField
                  type="text"
                  label="Last Name"
                  placeholder="Sunshine"
                  value={this.state.lastname}
                  onChange={this.handleChangeLastName}
                />
                <TextField
                  type="email"
                  label="Email"
                  placeholder="jesse.sunshine@gmail.com"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <TextField
                  type="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                <TextField
                  type="password"
                  label="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChangeConfirmPassword}
                />
              </FormLayout>
            </Card.Section>
            <div className="Polaris-Card__Footer">
              <ButtonGroup>
                <Button primary ariaExpanded>Register</Button>
                <Button
                  url="/"
                  plain size="small"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      this.props.history.push('/');
                    }
                  }
                >Go Back</Button>
              </ButtonGroup>
            </div>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    );
  }
}