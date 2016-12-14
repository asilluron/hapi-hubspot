# hapi-hubspot
[![Circle CI](https://img.shields.io/circleci/project/asilluron/hapi-hubspot/master.svg?style=flat-square)](https://circleci.com/gh/asilluron/hapi-hubspot/tree/master)

[![Stories in Ready](https://badge.waffle.io/asilluron/hapi-hubspot.svg?label=ready&title=Ready&style=flat-square)](http://waffle.io/asilluron/hapi-hubspot)

Hapi Plugin to handle [Hubspot](https://www.hubspot.com/) handshake and initial setup via [Node-Hubspot](https://github.com/brainflake/node-hubspot)
## Install
```
npm install --save hapi-hubspot
```

## Usage
```
var options = {
    key: 'demo' //Note: you can also use a key, see node-hubspot docs for more info
};

var server = new Hapi.Server();

server.register({
    register: require('hapi-hubspot'),
    options: options
}, function (err) { });

var client = server.plugins['hapi-hubspot'].client;
```

### Example
```
var client = server.plugins['hapi-hubspot'].client;

client.campaigns.get(function(err, res) {
  if (err) { throw err; }
  console.log(res);
});

```

## Options
* token
* key
