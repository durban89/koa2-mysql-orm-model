import {
  Model,
} from 'objection';

export default class Movie extends Model {
  static tableName = 'movie';

  static jsonSchema = {
    type: 'object',

    required: ['name'],

    properties: {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  };

  static relationMappings = {
    actors: {
      relation: Model.ManyToManyRelation,

      modelClass: `${__dirname}/Person`,

      join: {
        from: 'movie.id',
        through: {
          from: 'person_movie.movieId',
          to: 'person_movie.personId',
        },
        to: 'person.id',
      },
    },
  }
}
