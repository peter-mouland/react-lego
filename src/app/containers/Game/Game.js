import { connect } from 'react-redux';

import { fetchHand } from '../../actions';
import Game from '../../components/Game/Game';

function mapStateToProps(state) {
  return { ...state.game };
}

export default connect(
  mapStateToProps,
  { fetchHand }
)(Game);
