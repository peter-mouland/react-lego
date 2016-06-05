import React from 'react';
import { Link } from 'react-router';
import debug from 'debug';
import { copy } from './homepage-copy';

debug('lego:Homepage.jsx');

export default class Homepage extends React.Component {

  render() {
    return (
      <div id="homepage">
        <banner className="header">
          <h1>{copy.title}</h1>
          <p>{copy.blurb}</p>
        </banner>
        <Link to='/search'>search</Link>
      </div>
    );
  }
}
