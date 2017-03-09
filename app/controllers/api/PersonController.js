import Person from '../../models/Person';
import Movie from '../../models/Movie';

class PersonController {

  async index(ctx, next) {
    res.send({});
  }

  async create(ctx, next) {
    const person = await Person.query().insert(ctx.request.body);
    res.send(person);
  }

  async detail(ctx, next) {
    const person = await Person.query().patchAndFetchById(ctx.params.id, ctx.request.body);
    res.send(person)
  }

}

export default PersonController;
