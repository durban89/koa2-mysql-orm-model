'use strict';

import Person from '../models/Person';

class DefaultController {
  static async home(ctx, next){
    const person = await Person.query().insert(ctx.request.body);

    return ctx.body = person;
  }
}

export default DefaultController;
