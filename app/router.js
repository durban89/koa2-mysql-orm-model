import koaRouter from 'koa-router';
import DefaultController from './controllers/DefaultController';
import PersonController from './controllers/PersonController';
import ApiPersonController from './controllers/api/PersonController';

const router = new koaRouter();

router.get('/', DefaultController.home);
router.post('/', DefaultController.create);

router.get('/person', PersonController.index);
router.get('/person/create', PersonController.create);
router.get('/person/update/:id', PersonController.update);
router.get('/person/:id', PersonController.detail);
router.get('/person/delete/:id', PersonController.delete);
router.delete('/person/:id', PersonController.delete);
router.post('/person', PersonController.save);

router.get('/api/persons');
router.get('/')

export default router;
