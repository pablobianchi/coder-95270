import { verifyToken } from '../utils/jwt.utils.js';
import { getEventById } from '../services/event.service.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 */
export const authMiddleware = async( req, res, next ) => {

    try{
        const token = req.signedCookies.currentUser

        if( !token ){
            return res.status(401).json({
                status: 'error',
                message: 'No autenticado'
            })
        }

        const payload = verifyToken( token );

        req.user = payload;

        next()
    }
    catch( error ) {
        return res.status( 401 ).json({
            status: 'error',
            message: 'No autenticado',
            data: error.toString()
        });
    }
}

/**
 * Validamos los roles del usuario
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const authorizeRoles = (...allowedRoles ) => {

    return ( req, res, next ) => {

        try{

            console.log( allowedRoles )
            if( !allowedRoles.includes( req.user.role ) ){
                return res.status(403).json({"message":"Roles insuficientes"} )
            }
            next()

        }
        catch( error ){
            return res.status(500).json( {"error":error.toString() } )
        }
    }
}


export const authorizeEventOwnerOrAdmin = async( req, res, next ) =>{

    try{

        const { eventId } = req.params
        
        const event = await getEventById( eventId );

        if( ! event ){
            return res.status(404).json({"message":"404"})
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = event.organizer.toString() === req.user._id.toString();

        if( !isAdmin && !isOwner ){
            return res.status(403).json({"message":"403"})
        }

        req.event = event
        
        next()

        /**
         * Ver que exista ese evento
         * 
         * validar si es admin -> pasa 
         * validar si es organizer -> tiene que coincidir con el organizer del evento 
         */

    }
    catch( error ){
        return res.status(500).json( {"error":error.toString() } )
    }

}