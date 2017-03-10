'use strict';

require('babel-register')({
  "presets":[
    "es2015",
    "stage-0"
  ]
});

require('babel-polyfill');

const app = require('./index');
app.listen(8881);
module.exports = app;
