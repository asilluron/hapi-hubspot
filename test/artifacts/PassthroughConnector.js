'use strict';

class ConnectorStub {
  constructor (options, plugin) {
    this.campaigns = {};
    this.token = null;
    this.key = null;
    this.campaigns.get = cb => {
      if (!this.token && !this.key) {
        cb('an error', null);
      } else {
        cb(null, 'data');
      }
    };
  }

  useKey (key) {
    this.key = key;
  }

  useToken (token) {
    this.token = token;
  }
}

module.exports = ConnectorStub;
