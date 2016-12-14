'use strict';

let Client = require('hubspot');

exports.register = (server, opts, next) => {
  let client = new Client();
  if (opts.key) {
    client.useKey(opts.key);
  } else {
    client.useToken(opts.token);
  }

  client.campaigns.get(function (err, res) {
    if (err) {
      next(err);
    } else {
      server.expose('client', client);

      next();
    }
  });
};

exports.register.attributes = {
  pkg: require('../package.json')
};
