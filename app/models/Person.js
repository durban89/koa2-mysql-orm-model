'use strict';

import {
  Model
} from 'objection';

export default class Person extends Model {
  static tableName = 'person';

  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      id: {
        type: 'integer'
      },
      parentId: {
        type: ['integer', 'null']
      },
      firstName: {
        type: 'string',
        minLength: 1,
        maxLength: 255
      },
      lastName: {
        type: 'string',
        minLength: 1,
        maxLength: 255
      },
      age: {
        type: 'number'
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          zipCode: {
            type: 'string'
          }
        }
      }
    }
  }

  static relationMappings = {
    pets: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Animal',
      join: {
        from: 'Person.id',
        to: 'Animal.ownerId'
      }
    },

    movies: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Movie',
      join: {
        from: 'Person.id',
        through: {
          from: 'Person_Movie.personId',
          to: 'Person_movie.movieId',
        },
        to: 'Movie.id'
      }
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: Person,
      join: {
        from: 'Person.id',
        to: 'Person.parentId'
      }
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: 'Person.parentId',
        to: 'Person.id'
      }
    }
  }
}
