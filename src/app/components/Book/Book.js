import React from 'react';
import debug from 'debug';

import './book.scss';

debug('lego:Homepage.jsx');

export default class Book extends React.Component {

  render() {
    const { book } = this.props;

    return (
      <div id="book">
        <banner className="header">
          <h1>{book.title}</h1>
        </banner>
        <section className="book">
          {book.text}
        </section>
      </div>
    );
  }
}

