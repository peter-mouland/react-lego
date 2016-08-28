import React from 'react';
import debug from 'debug';

debug('lego:Homepage.jsx');

export default class Homepage extends React.Component {

  render() {
    return (
      <div id="homepage">
        <banner className="header">
          <h1>About React Lego</h1>
          <p>Iteratively add more technologies to React Applications.</p>
        </banner>
        <section>
          <h2>The 'Base' App</h2>
          <p>This demo is the '<strong>base</strong>' app, which includes :</p>
          <ul>
            <li>Rendering Universal Javascript (rendered on the server + client)</li>
            <li>Importing stylesheets</li>
            <li>
              Fully tested app :
              <ul>
                <li>Unit tests</li>
                <li>Functional tests</li>
                <li>End-to-end tests</li>
              </ul>
            </li>
          </ul>
          <h2>It could be simpler...</h2>
          <p>This app isn't aimed to be the simplest 'base' React app,
            it's aimed at <em>adding new technologies</em> simple.</p>
          <p>But, this means that when it comes to adding Redux for example,
            much less changes are required.</p>
        </section>
      </div>
    );
  }
}
