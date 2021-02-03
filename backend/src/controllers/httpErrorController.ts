/**
 * HttpErrorController
 */
import { BaseController } from './baseController';
import { Config } from '../helpers/config';

export class HttpErrorController extends BaseController
{
    public constructor(){ super();}

    /**
     * Muestra el error HTTP
     * 
     * @param {any} request     La solicitud HTTP
     * @param {any} response    La respuesta HTTP
     */
    public index (request:any, response:any)
    {
        // El código del error HTTP
        let code:number = request.params.code;

        // Fija el código de respuesta de la página
        response.status(code);

        response.render('error/error', {
            title   : `Error ${code}`,
            code    : code,
            app     : 
                {
                    name    : Config.get('app.name'),
                    version : Config.get('app.version')
                }
        });
    };
}