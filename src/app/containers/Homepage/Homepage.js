import React from 'react';
import { connect } from 'react-redux';
import debug from 'debug';

import { fetchBook } from '../../actions';
import Book from '../../components/Book/Book';

debug('lego:Homepage.jsx');

class Homepage extends React.Component {

  static needs = [fetchBook]

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.displayCount = this.displayCount.bind(this);
  }

  displayCount(e) {
    const count = this.props.book.wordCounts[e.target.value];
    this.setState({ count });
  }

  render() {
    const { book, error } = this.props;
    const { count } = this.state;
    return (
      <div id="homepage">
        <section className="word-count">
          <label htmlFor="wordCount">Check Word Count: </label>
          <input type="text" id="wordCount" name="wordCount" onChange={this.displayCount} />
          Result: { count }
        </section>

        {!book && (
          <div>
            Loading 'Dracula-by-Bram-Stoker'...
          </div>
        )}
        {error && (
          <div>
            Error Loading book. please try another.
          </div>
        )}
        {!!book && (
          <Book book={ book } />
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { ...state.book };
}

export default connect(
  mapStateToProps,
  { fetchBook }
)(Homepage);
