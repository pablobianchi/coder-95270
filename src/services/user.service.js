import { UserModel } from "../models/user.model.js"
import { isValidPassword } from "../utils/password.utils.js"



/**
 * 
 * @description busca un usuario x mail
 * @param {*} email 
 * @returns 
 */
export const getUserByEmail = async email => {
    return await UserModel.findOne({ email })
}


/**
 * @description Verifica el Login de un Usuario
 * @param {*} email 
 * @param {*} passowrd 
 * @returns 
 */
export const validateLogin = async( email, password ) => {
    
    const user = await getUserByEmail(email)

    if (!user) {
        return null;
    }

    const validPassword = await isValidPassword(password, user.password)

    if (!validPassword) {
        return null;
    }    

    return({
        id: user._id,
        email: user.email,
        role: user.role
    })
}