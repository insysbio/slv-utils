/*global describe it*/
'use strict';

/*
  testing of conversion of SLV into different formats
  from /cases/?/model.slv and compare with /cases/?/master/?
*/

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const { slvParse, slvjs2heta } = require('../src');
const cases = require('./slv-cases');

describe('SLV exports', () => {
  cases.forEach((x) => {
    describe('test ' + x.name, () => {
      // common obj
      let slv // SLV content
        , slvjs // slvjs to compare
        , slvjsActual // parsed SLV
        , hetajs // Heta JSON to compare
        , hetajsActual // conversion to Heta JSON
        , heta; // Heta to compare

      // source file
      slv = fs.readFileSync(
        path.resolve(__dirname, x.sourcePath),
        'utf8'
      );
      // slvjs file
      let slvjsStr = fs.readFileSync(
        path.resolve(__dirname, x.slvjsPath),
        'utf8'
      );
      slvjs = JSON.parse(slvjsStr);
      // hetajs file
      let hetajsStr = x.hetajsPath && fs.readFileSync(
        path.resolve(__dirname, x.hetajsPath),
        'utf8'
      );
      hetajs = hetajsStr && JSON.parse(hetajsStr);
      // heta file
      heta = x.hetaPath && fs.readFileSync(
        path.resolve(__dirname, x.hetaPath),
        'utf8'
      );

      it('parsing to slvjs', () => {
        slvjsActual = slvParse.parse(slv);
        expect(slvjsActual).to.be.deep.equal(slvjs);
      });

      hetajs && it('convert to Heta JSON module', () => {
        let hetajsActualString = slvjs2heta(slvjsActual, true);
        hetajsActual = JSON.parse(hetajsActualString);
        expect(hetajsActual).to.be.deep.equal(hetajs);
      });
      
      heta && it('convert to Heta module', () => {
        let hetaActual = slvjs2heta(slvjsActual, false, true);
        expect(hetaActual).to.be.equal(heta);
      });
    });
  });
});