import Preact, { h } from 'preact';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import debug from 'debug';

debug.enable(false);

const { assert, expect } = chai;
chai.should();
chai.expect();
chai.use(chaiEnzyme());
chai.use(sinonChai);

export {
  Preact,
  h,
  expect,
  sinon,
  shallow,
  mount,
  render
};
