import React from 'react';
import { copy } from './notFound-copy';
import { markup } from '../../utils';

export default class NotFound extends React.Component {
  render() {
    return (
      <section id="not-found">
        <h2>{copy.title}</h2>
        <p >{copy.blurb}</p>
        <aside >
          <p>{copy.try.blurb}</p>
          <ul>
            {markup('li', copy.try.options)}
          </ul>
        </aside>
      </section>
    );
  }
}
