import { createSchema, Type, typedModel } from 'ts-mongoose';

/**
 * Esquema de Usuario
 */
const schema = createSchema({ 
    code: Type.string({ required: true , unique: true }),
    name: Type.string({ required: true }),
    address: Type.string({ required: true }),
    population: Type.string({ required: true }),
    postal_code: Type.string({ required: true }),
    city: Type.string({ required: true }),
    phone: Type.string({ required: true }),
    email: Type.string({ required: true }),
    deleted: Type.boolean({ default: false })
  
});



const User = typedModel('User', schema, undefined, undefined, {

    /**
     * Obtiene el usuario por su id
     * 
     * @param {string} id   El id del usuario 
     */
    async findByUserId(id:string)
    {
        return await User.findById(id);
    },

    /**
     * Obtiene el usuario por su codigo
     * 
     */
    findByCode(code:string)
    {
        return User.findOne({ code});
    },

    /**
     * Crea un nuevo usuario
     * @param  {User}    user   El usuario a crear 
     */
    async create(user:any) 
    {
        // Comprueba si la dirección de correo suministrada ya está registrada
        let userExists = await User.findByCode(user.code);
        
        if (userExists) {
            // El usuario ya existe
            console.warn(`[WARN] El usuario ${user.code} ya está registrado. No se creará una nueva cuenta`);
            throw 'user-already-exists';
        } else {
            // Guarda el nuevo usuario
            return user.save();
        }
    },

});

/**
 * Exporta el modelo
 */
export default User;
