import React from 'react';
import debug from 'debug';
import { copy } from './search-copy';

debug('lego:Search.jsx');

export default class Homepage extends React.Component {

  render() {
    return (
      <div id="search">
        <banner className="header">
          <h1>{copy.title}</h1>
          <p>{copy.blurb}</p>
        </banner>
      </div>
    );
  }
}
