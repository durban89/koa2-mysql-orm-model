'use strict';

require('babel-register')({
  "presets":[
    "es2015",
    "stage-0"
  ]
});

require('babel-polyfill');

const app = require('./index');

module.exports = app;
