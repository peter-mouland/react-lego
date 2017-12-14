import Chance from 'chance';

import Bem from './bem';

const chance = new Chance();

let block;
let prefix;
let element;
let modifier;
let modifiers;
let classObj;
let util;
let utils;
let bem;

describe('bem test', () => {
  beforeEach(() => {
    element = chance.word();
    util = chance.word();
    utils = [chance.word(), chance.word()];
    modifier = chance.word();
    modifiers = [chance.word(), chance.word()];
    classObj = { 'valid-class': true, 'invalid-class': false };
    block = chance.word();
    prefix = `${chance.word()}-`;
  });

  describe('block class', () => {
    beforeEach(() => {
      bem = Bem({ block });
    });

    it('default', () => {
      expect(bem()).toEqual(block);
    });

    it('with element', () => {
      expect(bem(element)).toEqual(`${block}__${element}`);
    });

    it('with single string modifier', () => {
      expect(bem(null, modifier)).toEqual(`${block} ${block}--${modifier}`);
    });

    it('with array of string modifiers', () => {
      expect(bem(null, modifiers)).toEqual(`${block} ${block}--${modifiers[0]} ${block}--${modifiers[1]}`);
    });

    it('with object of modifiers', () => {
      expect(bem(null, classObj)).toEqual(`${block} ${block}--valid-class`);
    });

    it('with single string util', () => {
      expect(bem(null, null, util)).toEqual(`${block} ${util}`);
    });

    it('with array of string utils', () => {
      expect(bem(null, null, utils)).toEqual(`${block} ${utils[0]} ${utils[1]}`);
    });

    it('with object of utils', () => {
      expect(bem(null, null, classObj)).toEqual(`${block} valid-class`);
    });

    it('with element & single string modifier', () => {
      expect(bem(element, modifier)).toEqual(`${block}__${element} ${block}__${element}--${modifier}`);
    });

    it('with element & single string util', () => {
      expect(bem(element, null, util)).toEqual(`${block}__${element} ${util}`);
    });

    it('with single string modifier & single string util', () => {
      expect(bem(null, modifier, util)).toEqual(`${block} ${block}--${modifier} ${util}`);
    });

    it('with element & single string modifier & single string util', () => {
      expect(bem(element, modifier, util)).toEqual(`${block}__${element} ${block}__${element}--${modifier} ${util}`);
    });

    it('should handle a dynamic keys/complex structures', () => {
      const cn = Bem({ block: 'accordion' });
      const expand = 'xs';
      const wasExpanded = true;
      const expanded = false;
      const className = cn(
        null,
        {
          visible: wasExpanded && expanded,
          hidden: wasExpanded && !expanded,
          [`visible-${expand}`]: !!expand
        },
      );
      expect(className).toEqual('accordion accordion--hidden accordion--visible-xs');
    });

    it('should handle modifiers that are all false without returning an extra space', () => {
      const cn = Bem({ block: 'accordion' });
      const className = cn(null, { visible: false });
      expect(className).toEqual('accordion');
    });
  });

  describe('block with prefix', () => {
    beforeEach(() => {
      bem = Bem({ block, prefix });
    });

    it('default', () => {
      expect(bem()).toEqual(`${prefix}${block}`);
    });

    it('with element', () => {
      expect(bem(element)).toEqual(`${prefix}${block}__${element}`);
    });

    it('with single string modifier', () => {
      expect(bem(null, modifier)).toEqual(`${prefix}${block} ${prefix}${block}--${modifier}`);
    });

    it('with array of string modifiers', () => {
      expect(bem(null, modifiers)).toEqual(`${prefix}${block} ${prefix}${block}--${modifiers[0]} ${prefix}${block}--${modifiers[1]}`);
    });

    it('with object of modifiers', () => {
      expect(bem(null, classObj)).toEqual(`${prefix}${block} ${prefix}${block}--valid-class`);
    });

    it('with single string util', () => {
      expect(bem(null, null, util)).toEqual(`${prefix}${block} ${util}`);
    });

    it('with array of string utils', () => {
      expect(bem(null, null, utils)).toEqual(`${prefix}${block} ${utils[0]} ${utils[1]}`);
    });

    it('with object of utils', () => {
      expect(bem(null, null, classObj)).toEqual(`${prefix}${block} valid-class`);
    });

    it('with element & single string modifier', () => {
      expect(bem(element, modifier)).toEqual(`${prefix}${block}__${element} ${prefix}${block}__${element}--${modifier}`);
    });

    it('with element & single string util', () => {
      expect(bem(element, null, util)).toEqual(`${prefix}${block}__${element} ${util}`);
    });

    it('with single string modifier & single string util', () => {
      expect(bem(null, modifier, util)).toEqual(`${prefix}${block} ${prefix}${block}--${modifier} ${util}`);
    });

    it('with element & single string modifier & single string util', () => {
      expect(bem(element, modifier, util)).toEqual(`${prefix}${block}__${element} ${prefix}${block}__${element}--${modifier} ${util}`);
    });

    it('should handle a dynamic keys/complex structures', () => {
      const cn = Bem({ prefix: 'ac-', block: 'accordion' });
      const expand = 'xs';
      const wasExpanded = true;
      const expanded = false;
      const className = cn(
        null,
        {
          visible: wasExpanded && expanded,
          hidden: wasExpanded && !expanded,
          [`visible-${expand}`]: !!expand
        }
      );
      expect(className).toEqual('ac-accordion ac-accordion--hidden ac-accordion--visible-xs');
    });

    it('should handle modifiers that are all false without returning an extra space', () => {
      const cn = Bem({ prefix: 'ac-', block: 'accordion' });
      const className = cn(null, { visible: false });
      expect(className).toEqual('ac-accordion');
    });
  });
});
