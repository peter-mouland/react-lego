import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import debug from 'debug';

debug.enable(false);

const { assert, expect } = chai;
chai.should();
chai.expect();
chai.use(chaiEnzyme());

export {
  React,
  expect,
  sinon,
  shallow,
  mount,
  render
};
