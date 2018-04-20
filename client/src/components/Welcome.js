import React, { Component } from 'react';
import { Layout, CalloutCard } from '@shopify/polaris';

export default class Welcome extends Component {
  render() {
    return (
      <Layout.Section>
        <CalloutCard
          title="New to Restaurant Manager?"
          illustration="https://polaris.shopify.com/assets/69f86b68b3ffdff80ef436a4dee51acc-V4_MR_Considerate.png"
          primaryAction={
            {
              content: 'Register Now',
              url: "/register",
              onAction: (e) => {
                e.preventDefault();
                this.props.history.push('/register');
              }
            }
          }
        >
          <p>Get started today and create your account to Manage all operations in your restaurant.</p>
        </CalloutCard>
        <br />
        <br />
      </Layout.Section>
    );
  }
}