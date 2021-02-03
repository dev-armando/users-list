/**
 * App
 */
import * as express from 'express';
import * as body_parser from 'body-parser';
import * as cors from 'cors';
import { Config } from './config';
import { Router } from '../routes/router';
import { Mongoose } from './mongoose';

export class App
{
  
    private static instance:App = null;
    public app:express.Express;

    private constructor () 
    {           
        // Iniciamos el Framework express      
        this.app = express();
        this.config();
    }

    /**
     * Configura la aplicación
     * 
     * @param {void}
     */
    private config():void
    {
        // Usamos el body parser
        this.app.use(body_parser.urlencoded({ 
            extended: false 
        }));

        this.app.use(body_parser.json());

        this.app.use(cors());
        this.app.options('*', cors());
   }

    /**
     * Inicia el servidor
     * 
     * @return {Promise}
     */
    private startServer():Promise<any>
    {
        return new Promise((resolve, reject) => {
                  
         
            // El momento actual
            let moment:string = new Date().toLocaleTimeString()

            // El servidor
            let server:any = null
             
            server = require('http').createServer(this.app).listen(Config.get('app.port'), () => {
            
                console.info(`[OK] ${moment} Servidor Iniciado`);

                resolve(server);
            }).on('error', (error: { errno: string; }) => {
                    if(error.errno === 'EADDRINUSE') {
                        console.log(`[ERROR] El puerto ${Config.get('app.port')} está ya siendo utilizado por otra aplicación`);
                        process.exit();
                    } else {
                        console.error(`[ERROR] ${error}`);
                        process.exit();
                    }
            });
            
        });
    }

    /**
     * Rutas de la aplicación
     * 
     * @return {Router}
     */
    private route():Router
    {
        // Inicia el router
        return new Router(this.app);
    }

    /**
     * Obtiene la aplicación actual
     * 
     * @return {App}
     */
    public static get():App
    {
        if (!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    /**
     * Ejecuta la aplicación
     * 
     * @return {void}
     */
    public static run():void
    {
        // Obtiene la aplicación
        let application:App = App.get();

        // El momento actual
        let moment:string = new Date().toLocaleTimeString();

        console.info(`[OK] ${moment} Aplicación ${Config.get('app.name')} ${Config.get('app.version')} iniciada. Escuchando peticiones en el puerto ${Config.get('app.port')}`);

        // Inicia el servidor
        application.startServer()
            .then(() => {
                // Carga las rutas de la aplicación
                application.route();

                console.info(`[OK] ${moment} Las rutas han sido cargadas con éxito`);

                // Inicia la conexión a Mongo
                Mongoose.startConnection();

            });
    }

}
