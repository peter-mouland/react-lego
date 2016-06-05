import { expect, shallow, React } from '../../../../tests/support/test.helper';
import Game from './Game';
import { copy } from './game-copy';

const baseProps = {};
describe('Settings Container', () => {
  it('should have an id of homepage', () => {
    const wrapper = shallow(<Game { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'game');
  });
  //  unit testing goes here
});
