import * as objection from 'objection';
import Movie from '../../models/Movie';


class MovieController {
  // add existing person as an actor to a movie
  async createActors(ctx, next) {
    const movie = await Movie
      .query()
      .findById(ctx.params.id);

    if (!movie) {
      return this.throw(404);
    }

    await movie
      .$relatedQuery('actors')
      .relate(ctx.request.body.id);

    ctx.body = ctx.request.body;
    return ctx.body;
  }

  // Get Movie's actors
  async actors(ctx, next) {
    const movie = await Movie
      .query()
      .findById(ctx.params.id);

    if (!movie) {
      return this.throw(404);
    }

    const actors = await movie.$relatedQuery('actors');

    ctx.body = actors;
    return ctx.body;
  }
}

export default MovieController;
