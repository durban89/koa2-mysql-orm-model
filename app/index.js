'use strict';

import Knex from 'knex';
import {
  Model
} from 'objection';
import knexConfig from './knexfile';
import config from 'config';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import co from 'co';
import koaStatic from "koa2-static"
import router from './router';

// 配置路径
global.__controllerPath = __dirname + '/controllers';
global.__modelPath = __dirname + '/models';

const path = require('path');

// initial knex
const knex = Knex(knexConfig.development);
Model.knex(knex);

// initial app
const app = new Koa();

// initial render
render(app, {
  root: path.join(__dirname + '/view'),
  layout: 'template',
  viewExt: 'ejs',
  cache: true,
  debug: true
});
app.context.render = co.wrap(app.context.render);

// initial static

app.use(koaLogger())
  .use(bodyParser())
  .use(router.routes())
  .use(koaStatic({
    path: '/web',
    root: __dirname + "/../static"
  }));

app.listen(8881);

console.log('Listening 8881');
