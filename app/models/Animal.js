import {
  Model,
} from 'objection';

export default class Animal extends Model {
  static tableName = 'animal';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: {
        type: 'integer',
      },
      ownerId: {
        type: ['integer', 'null'],
      },
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      species: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  };

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Person`,
      join: {
        from: 'animal.ownerId',
        to: 'person.id',
      },
    },
  }
}
