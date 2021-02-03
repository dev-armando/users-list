/**
 * mongoose
 */

import {connect} from 'mongoose';
import { Config } from "./config";

export class Mongoose
{
    /**
     * Una instancia única del objeto
     */
    private static instance:Mongoose = null;

    /**
     * La conexión a la base de datos
     */
    protected connection:any;

    /**
     * El constructor
     */
    private constructor()
    {
        // El momento actual
        let moment:string = new Date().toLocaleTimeString();

        // Inicia la conexión
        this.start()
            .then(connection => {
                console.info(`[OK] ${moment} Conexión a Mongo realizada con éxito ${connection}`);
                this.connection = connection;
            })
            .catch(error => {
               console.error(`[ERROR] No se ha podido establecer la conexión con el servidor\n[ERROR] ${moment} ${error}`);
            });
    }

    /**
     * Inicia la conexión al servidor mongo
     * 
     * @return {Mongoose}
     */
    public static startConnection():Mongoose
    {
        let connection:Mongoose;

        if (!Mongoose.instance) {
            connection = new Mongoose();
        }

        Mongoose.instance = connection;

        return connection;
    }

    /**
     * Inicia la conexión a Mongo a través del cliente Mongoose
     * 
     * @return {Promise}
     */    
    public start():Promise<any>
    {
        return new Promise((resolve, reject) => {

            let connectionString:string;

        
                connectionString = `mongodb://${Config.get('mongo.server')}:${Config.get('mongo.port')}/${Config.get('mongo.database')}`;
          

            connect(connectionString, 
                { 
                    useCreateIndex      : true,
                    useNewUrlParser     : true,
                    useUnifiedTopology  : true,
                    useFindAndModify    : false
                }
            )
            .then(() => {
                resolve(connectionString);
            })
            .catch(error => {
                reject(`${connectionString} ${error}`);
            });

        });
    }
}
