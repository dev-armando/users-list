/**
 * UserController
 */

import { BaseController } from './baseController';
import { HttpResponse } from '../helpers/httpResponse';
import { Request, Response } from 'express';
import User from '../models/user';


export class UserController extends BaseController 
{

    public constructor() { super();}

    /* Test */
    public test(request: Request, respose: Response){
        respose.status(HttpResponse.Ok).json('TEST');
    }

    /**
     * Crea un usuario nuevo
     */
    public async create(request: Request, response: Response)
    {   
        
        let newUser = new User(request.body);
        // Crea un nuevo usuario        
        await User.create(newUser)
            .then(user => {
                response.status(HttpResponse.Ok).json('Usuario Creado');
            })
            .catch (error => {
                response.status(HttpResponse.BadRequest).json(error); 
            });
    }

    /**
     * Elimina un usuario
     */    
    public delete(request: Request, response: Response) 
    {
        let code = request.params.code
        User.findOneAndUpdate( {code}  , {deleted:true })
        .then(  user =>{
            response.status(HttpResponse.Ok).json('Usuario Eliminado');
        })
        .catch((error) => {
            response.status(HttpResponse.NotFound).json(error);
        });
    }
    /**
      * Consultar Usuarios 
     */
    public async getAll(request: Request, respose: Response) {
        await User.find({ deleted: false })
          .then((users) => {
            respose.status(HttpResponse.Ok).json(users);
          })
          .catch((error) => {
            respose.status(HttpResponse.NotFound).json(error);
          });
    }

    /**
      * Consultar Usuario 
     */
    public async getById(request: Request, respose: Response) {
        
        let id = request.params.id

        await User.findByUserId(id)
          .then((users) => {
            respose.status(HttpResponse.Ok).json(users);
          })
          .catch((error) => {
            respose.status(HttpResponse.NotFound).json(error);
          });
    }

       /**
      * Consultar Usuario por Codigo
     */
    public async getByCode(request: Request, respose: Response) {
        
        let code = request.params.code

        await User.findByCode(code)
          .then((users) => {
            respose.status(HttpResponse.Ok).json(users);
          })
          .catch((error) => {
            respose.status(HttpResponse.NotFound).json(error);
          });
    }

    /**
      * Actualizar Usuario  
     */
    public async update(request: Request, respose: Response) {
        
        let id = request.params.id
        let newUser = request.body;

        await User.findByIdAndUpdate(id , newUser ) .then((users) => {
            respose.status(HttpResponse.Ok).json('Usuario Actualizado');
          })
          .catch((error) => {
            respose.status(HttpResponse.NotFound).json(error);
          });

        
    }
  
}
