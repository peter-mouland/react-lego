import React from 'react';
import { copy } from './notFound-copy';

export default class NotFound extends React.Component {
  render() {
    return (
      <section id="not-found">
        <h2>{copy.title}</h2>
        <p >{copy.blurb}</p>
        <aside >
          <p>{copy.try.blurb}</p>
          <ul>
            {copy.try.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </aside>
      </section>
    );
  }
}
