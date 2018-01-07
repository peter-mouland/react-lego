import { connect } from 'react-redux';

import { fetchHand } from '../../actions';
import Game from '../../components/Game/Game';

function mapStateToProps(state) {
  return { ...state.game };
}

const WrappedComponent = connect(
  mapStateToProps,
  { fetchHand }
)(Game);

WrappedComponent.needs = [fetchHand];

export default WrappedComponent;
