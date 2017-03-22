import React from 'react';
import { connect } from 'react-redux';
import debug from 'debug';

import { fetchBook } from '../../actions';
import Book from '../../components/Book/Book';

debug('lego:Homepage.jsx');

class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.displayCount = this.displayCount.bind(this);
  }

  componentDidMount() {
    this.props.fetchBook('Dracula-by-Bram-Stoker');
  }

  displayCount(e) {
    const count = this.props.book.wordCounts[e.target.value];
    this.setState({ count });
  }

  render() {
    const { book } = this.props;
    const { count } = this.state;

    return (
      <div id="homepage">
        {!book && (
          <div>
            Loading 'Dracula-by-Bram-Stoker'...
          </div>
        )}
        <section className="word-count">
          <label htmlFor="wordCount">Check Word Count: </label>
          <input type="text" id="wordCount" name="wordCount" onChange={this.displayCount} />
          Result: { count }
        </section>
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
