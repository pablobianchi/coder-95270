import { UserModel } from '../models/user.model.js'
import { createHash } from '../utils/password.utils.js';
import { getUserByEmail } from '../services/user.service.js';


/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 */
export const register = async (req, res) => {  
    try {

        const { first_name, last_name, email, password  } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios'
            })
        }
        
        const normalizedEmail = email.toLowerCase().trim()

        //const userExists = await UserModel.findOne({email:normalizedEmail})
        const userExists = await getUserByEmail(normalizedEmail)

        if( userExists ){
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un Usuario registrado con el mismo mail'
            })
        }


        const newUser = await UserModel.create({

            first_name:first_name,
            last_name:last_name,
            email:normalizedEmail,
            password: await createHash( password , 10 ) ,
            role:'user'

        })

        res.status(201).json({ message:"ok", data: { id:newUser._id, 
                                                    first_name:newUser.first_name, 
                                                    last_name:newUser.last_name} })  
        //res.status(200).json({ message:"ok", data: await EventModel.find({}) })  
    } 
    catch (error) { 
        //console.log( error )
        res.status(500).json({ status: 'Error' , message:error.toString() }) }
}
