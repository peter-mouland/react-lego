import React from 'react';
import debug from 'debug';

debug('lego:Homepage.jsx');

export default () => (
  <div id="homepage">
    <header className="header">
      <h1>About React Lego</h1>
      <p>Iteratively add more technologies to React Applications.</p>
    </header>
    <section>
      <h2>The &lsquo;Base&rsquo; App</h2>
      <p>This demo is the &lsquo;<strong>base</strong>&rsquo; app, which includes :</p>
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
      <p>This app isn&apos;t aimed to be the simplest &lsquo;base&rsquo; React app,
        it&apos;s aimed at <em>adding new technologies</em> simple.
      </p>
      <p>But, this means that when it comes to adding Redux for example,
        much less changes are required.
      </p>
    </section>
  </div>
);
