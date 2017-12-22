import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  if (typeof error !== 'string') {
    return (
      <p className="error">
        {String(error)} <strong>needs to be handled, was not a string</strong>
      </p>
    );
  }
  return <p className="error">Error Loading cards!<span>{error}</span></p>;
};

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
