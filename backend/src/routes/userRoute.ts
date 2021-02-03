/**
 * UserRoute
 */
import { UserController } from "../controllers/userController";

const userController = new UserController();

const UserRouter:any = userController.router();

/**
 * consultar por ID 
 * @route /v1/user/user/:id
 * @method get
 */
UserRouter.get('/:id', userController.getById);

/**
 * consultar por CODE 
 * @route /v1/user/user/:code
 * @method get
 */
UserRouter.get('/code/:code', userController.getByCode);

/**
 * consultar todos los usuarios 
 * @route /v1/user/
 * @method get
 */
UserRouter.get('/', userController.getAll);

/**
 * Elimina un usuario
 * 
 * @route /v1/user/delete/:id
 * @method post
 */
UserRouter.delete('/:code', userController.delete);

/**
 * crea un usuario
 * @route /v1/user/create
 * @method post
 */
UserRouter.post('/create', userController.create);


/**
 * Editar un usuario
 * @route /v1/user/create
 * @method post
 */
UserRouter.put('/:id', userController.update);


/* Ruta de prueba */
UserRouter.get('/test', userController.test);

module.exports = UserRouter;