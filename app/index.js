'use strict';

import Knex from 'knex';
import {
  Model
} from 'objection';
import knexConfig from './knexfile';
import Koa from 'koa';
import koaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import DefaultController from './controllers/DefaultController';

// initial knex
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();

// router
const router = new koaRouter();


router.get('/', DefaultController.home);
router.post('/', DefaultController.create);
app.use(koaLogger()).use(bodyParser()).use(router.routes());

app.listen(8881);

console.log('Listening 8881');
