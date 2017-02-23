'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const keywords = require('../src');
const { describe, it, before } = require('mocha');
require('dotenv').config();

describe('Test Suite', function () {

  describe('Pushing', function () {
    let result;

    before(function (done) {
      const actors = [
        'Leonardo DiCaprio',
        'Steve Carell',
        'Alec Baldwin',
        'Micheal Cera'
      ];

      new keywords(process.env.WIT_TOKEN)
        .entity('actor')
        .push(actors)
        .then(response => {
          result = response;
          done();
        })
        .catch(() => done());
    });

    it('Push array of keywords to the actor entity', function () {
      expect(result.length).to.eql(4);
    });
  });

  describe('Duplicates', function () {
    let result;

    before(function (done) {
      const actors = [
        'Leonardo DiCaprio',
        'Leonardo DiCaprio',
        'LEONARDO DiCaprio',
        'Leonardo DICAPRIO',
      ];

      new keywords(process.env.WIT_TOKEN)
        .entity('actor')
        .push(actors)
        .then(response => {
          result = response;
          done();
        })
        .catch(() => {
          console.log(err);
          done();
        });
    });

    it('Finds duplicates', function () {
      expect(result.length).to.eql(4);
      expect(result.filter(actor => actor.status === 'added').length).to.eql(0);
    });
  });

  describe('After', function () {
    let result;
    let afterHook = 0;

    before(function (done) {
      const actors = [
        'Leonardo DiCaprio',
        'Leonardo DiCaprio',
        'LEONARDO DiCaprio',
        'Leonardo DICAPRIO',
      ];

      new keywords(process.env.WIT_TOKEN)
        .entity('actor')
        .after(() => afterHook++)
        .push(actors)
        .then(response => {
          result = response;
          done();
        })
        .catch(() => {
          console.log(err);
          done();
        });
    });

    it('Can set callback after each push', function () {
      expect(afterHook).to.eql(4);
    });
  });

});