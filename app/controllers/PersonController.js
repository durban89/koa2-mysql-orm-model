import Person from '../models/Person';
import Movie from '../models/Movie';

class PersonController {
  static async index(ctx, next) {
    const person = await Person
      .query()
      .skipUndefined()
      .where('age', '>=', ctx.request.query.minAge)
      .where('age', '<', ctx.request.query.maxAge)
      .where('firstName', 'like', ctx.request.query.firstName);

    await ctx.render('person/index', {
      person,
    });
  }

  static async create(ctx, next) {
    return ctx.render('person/create');
  }

  static async save(ctx, next) {
    if (ctx.request.body.id) {
      const person = await Person
        .query()
        .update({
          firstName: ctx.request.body.firstName,
          lastName: ctx.request.body.lastName,
          age: parseInt(ctx.request.body.age),
        })
        .where('id', ctx.request.body.id);
    } else {
      const person = await Person
        .query()
        .insert({
          firstName: ctx.request.body.firstName,
          lastName: ctx.request.body.lastName,
          age: parseInt(ctx.request.body.age),
        });
    }

    ctx.status = 301;
    ctx.redirect('/person');
  }

  static async update(ctx, next) {
    const person = await Person
      .query()
      .findById(ctx.params.id);

    await ctx.render('/person/update', {
      person,
    });
  }

  static async delete(ctx, next) {
    const person = await Person
      .query()
      .delete()
      .where('id', '=', ctx.params.id);

    ctx.redirect('/person');
    ctx.status = 301;
  }

  static async detail(ctx, next) {
    const person = await Person
      .query()
      .findById(ctx.params.id);

    await ctx.render('person/detail', {
      person,
    });
  }
}

export default PersonController;
