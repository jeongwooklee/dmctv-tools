import React, { Component } from 'react';
import AssetVersionGenerator from '../AssetVersionGenerator/AssetVersionGenerator';
import { ResetCSS } from './ResetCSS';

class App extends Component {
  render() {
    return (
      <>
        <ResetCSS />
        <AssetVersionGenerator />
      </>
    );
  }
}

export default App;
