import {
  Model,
} from 'objection';
import Animal from './Animal';
import Movie from './Movie';

export default class Person extends Model {
  static tableName = 'person';

  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      id: {
        type: 'integer',
      },
      parentId: {
        type: ['integer', 'null'],
      },
      firstName: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      lastName: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      age: {
        type: 'number',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          zipCode: {
            type: 'string',
          },
        },
      },
    },
  }

  static relationMappings = {
    pets: {
      relation: Model.HasManyRelation,
      modelClass: Animal, // __dirname + '/Animal',
      join: {
        from: 'person.id',
        to: 'animal.ownerId',
      },
    },

    movies: {
      relation: Model.ManyToManyRelation,
      modelClass: Movie, // __dirname + '/Movie',
      join: {
        from: 'person.id',
        through: {
          from: 'person_movie.personId',
          to: 'person_movie.movieId',
        },
        to: 'movie.id',
      },
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: Person,
      join: {
        from: 'person.id',
        to: 'person.parentId',
      },
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'person.parentId',
        to: 'person.id',
      },
    },
  }
}
