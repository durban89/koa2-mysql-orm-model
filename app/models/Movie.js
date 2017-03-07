import {
  Model
} from 'objection';

export default class Movie extends Model {
  static tableName = 'movie';

  static jsonSchema = {
    tyoe: 'object';

    required: ['name'],

    properties: {
      id: {
        type: 'integer'
      },
      name: {
        type::'string',
        minLength: 1,
        maxLength: 255
      }
    }
  };

  static relationMappings = {
    actors: {
      relation: Model.ManyToManyRelation,

      modelClass: `${__dirname}/Person`,

      join: {
        from: 'Movie',
        through: {
          from: 'Person_Movie.movieId',
          from: 'Person_Movie.personId'
        },
        to: 'Person.id'
      }
    }
  }
}
