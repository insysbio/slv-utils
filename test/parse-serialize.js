/*global describe it*/
'use strict';

/*
  testing of parse and serialize for: slv, rct, dat
  The "master files" can be rebuilt using /test/build.js script and are stored in /test/cases/cases.json
*/

const { expect } = require('chai');

const slvUtils = require('../src');
const cases = require('./cases/cases.json');

describe('Testing rct-parse', () => {
  cases['rct-parse'].forEach((test) => {
    it(test.name, () => {
      let res = slvUtils.rctParse.parse(test.input);
      expect(res).to.be.deep.equal(test.expected);
    });
  });
});

describe('Testing dat-parse', () => {
  cases['dat-parse'].forEach((test) => {
    it(test.name, () => {
      let res = slvUtils.datParse.parse(test.input);
      expect(res).to.be.deep.equal(test.expected);
    });
  });
});

describe('Testing dat-serialize', () => {
  cases['dat-serialize'].forEach((test) => {
    let res = slvUtils.datTemplate(test.input);
    expect(res).to.be.deep.equal(test.expected);
  });
});

describe('Testing rct-serialize', () => {
  cases['rct-serialize'].forEach((test) => {
    it(test.name, () => {
      let res = slvUtils.rctTemplate(test.input);
      // XXX: why we have unnecessary "\r\n" in test.expected
      // check cases.json "rct-serialize" property
      let expected = test.expected.replace(/\r+\n/g, '\n').trim();
      expect(res).to.be.equal(expected);
    });
  });
});
