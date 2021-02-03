/**
 * Clase Config
 */

 import * as path from 'path'

export class Config
{
    
    /**
     * Instancia única de la clase 
     */
    private static instance = null;

    /**
     * Contiene la configuración
     */
    protected config:any;

    /**
     * El constructor es privado
     */
    private constructor()
    {
        Config.instance = this;

        this.readConfig();
    }
 
    /**
     * Lee el archivo de configuración
     * 
     * @return {void}
     */
    protected readConfig():void
    {

        let ini = require('ini');
        let fs  = require('fs');
        this.config = ini.parse(fs.readFileSync(path.resolve(__dirname +'/../.env'), 'utf-8'));
    }

    public static get(value:string):string
    {
        let configuration:any;

        if (Config.instance == null) {
            configuration = new Config();
        } else {
            configuration = Config.instance;
        }

        const access = require('safe-access');

        let result:string = access(configuration.config, value);

        if (typeof result === 'undefined') {
            // El momento actual
            let moment:string = new Date().toLocaleTimeString();
            
            throw `[ERROR] ${moment} Clave ${value} no encontrada en el archivo de configuración`;
        }

        return result;
    }
}