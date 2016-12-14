'use strict';

const Code = require('code');
const Hapi = require('hapi');
const Lab = require('lab');
const rewire = require('rewire');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;

describe('Hubspot Connection', () => {
  describe('Key Based Connection', () => {
    let server, plugin;
    let ConnectorStub = require('./artifacts/PassthroughConnector');

    beforeEach(done => {
      plugin = rewire('../');
      plugin.__set__('Client', ConnectorStub);
      server = new Hapi.Server({ debug: false });
      server.connection();
      server.register({ register: plugin, options: {key: 'wowtest'} }, () => {
        done();
      });
    });

    it('sets up hubspot with a key', done => {
      expect(server.plugins['hapi-hubspot'].client.key).to.equal('wowtest');

      done();
    });

    it('it does nothing with a token', done => {
      expect(server.plugins['hapi-hubspot'].client.token).to.equal(null);

      done();
    });
  });

  describe('Token Based Connection', () => {
    let server, plugin;
    let ConnectorStub = require('./artifacts/PassthroughConnector');

    beforeEach(done => {
      plugin = rewire('../');
      plugin.__set__('Client', ConnectorStub);
      server = new Hapi.Server({ debug: false });
      server.connection();
      server.register({ register: plugin, options: {token: 'ohtoken'} }, () => {
        done();
      });
    });

    it('sets up hubspot with a token', done => {
      expect(server.plugins['hapi-hubspot'].client.token).to.equal('ohtoken');

      done();
    });

    it('it does nothing with a key', done => {
      expect(server.plugins['hapi-hubspot'].client.key).to.equal(null);

      done();
    });
  });

  describe('Unconfigured Connection', () => {
    let server, plugin;
    let ConnectorStub = require('./artifacts/PassthroughConnector');

    beforeEach(done => {
      plugin = rewire('../');
      plugin.__set__('Client', ConnectorStub);
      server = new Hapi.Server({ debug: false });
      server.connection();
      done();
    });

    it('sets up hubspot with a token', { timeout: 500 }, done => {
      server.register({ register: plugin, options: {} }, err => {
        expect(err).to.equal('an error');

        done();
      });
    });
  });
});
