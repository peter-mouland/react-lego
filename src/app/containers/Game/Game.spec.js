import { expect, shallow, React } from '../../../../tests/support/test.helper';
import Game from './Game';

const baseProps = {};

describe('Game Container', () => {
  it('should have an id of game', () => {
    const wrapper = shallow(<Game { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'game');
  });
  //  unit testing goes here
});
