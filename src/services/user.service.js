import { UserModel } from "../models/user.model.js"



/**
 * Hola, soy una documentacion
 * @tutorial rwerw
 * 
 * @description busca un usuario x mail
 * @param {*} email 
 * @returns 
 */
export const getUserByEmail = async email => {
    return await UserModel.findOne({ email })
}
