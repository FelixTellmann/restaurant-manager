import React, { Component } from 'react';
import { Layout, Card, FormLayout, TextField, ButtonGroup, Button } from '@shopify/polaris';

export default class Password extends Component {
  state = {
    email: '',
  };

  handleChangeEmail = (email) => {
    this.setState({ email });
  };

  render() {
    return (
      <Layout sectioned>
        <Layout.AnnotatedSection
          title="Reset your password"
          description="Enter your email to reset your password">
          <Card>
            <Card.Section>
              <FormLayout>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="jesse.sunshine@gmail.com"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
              </FormLayout>
            </Card.Section>
            <div className="Polaris-Card__Footer">
              <ButtonGroup>
                <Button primary>Send Password</Button>
                <Button
                  url="/"
                  plain size="small"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      console.log(this.props);
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