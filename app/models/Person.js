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
}
