import jwt from 'jsonwebtoken'
/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 */
export const authMiddleware = async( req, res, next ) => {

    try{
        const token = req.cookies.currentUser

        if( !token ){
            return res.status(401).json({
                status: 'error',
                message: 'No autenticado - MIDDLEWARE - TOKEN'
            })
        }

        const payload = jwt.verify( token, '1234' );

        req.user = payload;

        next()
    }
    catch( error ) {
        return res.status( 401 ).json({
            status: 'error',
            message: 'No autenticado - MIDDLEWARE',
            data: error.toString()
        });
    }
}