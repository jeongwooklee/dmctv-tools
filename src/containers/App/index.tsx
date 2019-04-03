import React, { Component } from 'react';
import AssetVersionGenerator from '../AssetVersionGenerator';
import { ResetCSS } from './ResetCSS';
import { Route } from 'react-router-dom';
import Home from '../Home';
import { ASSET_GENERATOR_URL } from '../../lib/urls';

export const APP_VERSION = 'v.0.0.2';

class App extends Component {
  render() {
    return (
      <>
        <ResetCSS />
        <Route exact path="/" component={Home} />
        <Route
          path={`${ASSET_GENERATOR_URL}/:id?`}
          component={AssetVersionGenerator}
        />
      </>
    );
  }
}

export default App;
