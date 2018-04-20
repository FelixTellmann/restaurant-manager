import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import App from './containers/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import { Provider } from 'react-redux';
import AppStore from "./containers/HomeStore";
import '@shopify/polaris/styles.css';
import './custom.css';

ReactDOM.render(
  <Provider store={AppStore}>
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/" component={Home} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
