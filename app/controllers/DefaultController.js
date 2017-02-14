'use strict';

import Person from '../models/Person';

class DefaultController {
  static async home(ctx, next) {
    const person = await Person
      .query()
      .skipUndefined()
      .where('age', '>=', ctx.request.query.minAge)
      .where('age', '<', ctx.request.query.maxAge)
      .where('firstName', 'like', ctx.request.query.firstName);

    return ctx.body = person;
  }

  static async create(ctx, next) {
    const person = await Person.query().insert(ctx.request.body);

    return ctx.body = person;
  }
}

export default DefaultController;
