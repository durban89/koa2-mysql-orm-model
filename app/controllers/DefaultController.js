

import Person from '../models/Person';

class DefaultController {
  static async home(ctx, next) {
    const person = await Person
      .query()
      .skipUndefined()
      .where('age', '>=', ctx.request.query.minAge)
      .where('age', '<', ctx.request.query.maxAge)
      .where('firstName', 'like', ctx.request.query.firstName);

    await ctx.render('index', {
      body: 'Hello World',
      person,
    });
  }

  static async create(ctx, next) {
    const person = await Person.query().insert(ctx.request.body);

    return ctx.body = person;
  }

  static async update(ctx, next) {
    const person = await Person
      .query()
      .patch({
        lastName: ctx.request.body.lastName,
      })
      .where('id', '=', ctx.request.body.id);

    await ctx.render('update', {
      person,
    });
  }

  static async delete(ctx, next) {
    const person = await Person.query().delete().where('id', '=', ctx.request.body.id);

    await ctx.render('delete', {
      person,
    });
  }
}

export default DefaultController;
