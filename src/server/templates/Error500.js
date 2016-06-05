import React from 'react';

export default class Error500 extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <title>Error 500 - Man down!</title>
        </head>
        <body id="error-app">
          <div className="layout__main">
            <h1>Error 500</h1>
            <p>Man Down</p>
          </div>
        </body>
      </html>
    );
  }
}

