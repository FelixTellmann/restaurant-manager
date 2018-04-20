import React, { Component } from 'react';
import { Card, Tabs, Page } from '@shopify/polaris';
import { Redirect, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import IngredientsTable from '../components/IngredientsTable'
import ConversionsTable from "../components/ConversionsTable";


export default class App extends Component {
  state = {
    selected: 1,
  };

  handleTabChange = (selectedTabIndex) => {
    this.setState({ selected: selectedTabIndex });
  };
 
  render() {
    const { selected } = this.state;
    const { match } = this.props;
    const tabs = [
      {
        id: 'menu',
        content: 'Menu',
        route: '/menu',
      },
      {
        id: 'ingredients',
        content: 'Ingredients',
        route: '/ingredients',
      },
      {
        id: 'recipes',
        content: 'Recipes',
        route: '/recipes',
      },
      {
        id: 'conversions',
        content: 'Conversions',
        route: '/conversions',
      }
    ];

    return (
      <Page
        fullWidth
        title="Kitchen Management"
        separator
      >
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={this.handleTabChange}
          />
          <Card.Section title={tabs[selected].content}>
            <Redirect to={match.url + tabs[selected].route} />
            <Switch>
              <Route path={`${match.url}/menu`} component={Home} />
              <Route path={`${match.url}/ingredients`} component={IngredientsTable} />
              <Route path={`${match.url}/recipes`} component={ConversionsTable} />
              <Route path={`${match.url}/conversions`} component={Home} />
            </Switch>
          </Card.Section>
        </Card>
      </Page>
    );
  }
}