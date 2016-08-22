import React from 'react';
import debug from 'debug';

import { copy } from './homepage-copy';
import { LinkHelper } from '../../routes';

debug('lego:Homepage.jsx');

export default class Homepage extends React.Component {

  render() {
    return (
      <div id="homepage">
        <banner className="header">
          <h1>{copy.title}</h1>
          <p>{copy.blurb}</p>
        </banner>
        <section>
          <h2>Demo</h2>
          <p>Do you want to play?</p>
          <LinkHelper to="game" />
        </section>
      </div>
    );
  }
}
