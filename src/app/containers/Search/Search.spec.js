import { expect, shallow, React } from '../../../../tests/support/test.helper';
import Search from './Search';
import { copy } from './search-copy';

const baseProps = {};
describe('Settings Container', () => {
  it('should have an id of homepage', () => {
    const wrapper = shallow(<Search { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'search');
  });
  //  unit testing goes here
});
