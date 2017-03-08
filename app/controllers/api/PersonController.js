import Person from '../../models/Person';
import Movie from '../../models/Movie';

class PersonController {
  async index (ctx, next){

    await next();
  }

  async create (ctx, next){


  }

}

export default PersonController;