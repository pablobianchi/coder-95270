import passport  from "passport"
import { Strategy as JwtStrategy } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"

import { validateLogin, getUserByEmail } from '../services/user.service.js'

import { env } from "./env.js"

passport.use('register', new LocalStrategy( 
    {   usernameField:'email', 
        passwordField:'password' , 
        session:false ,
        passReqToCallback:true 
    },

    async ( req, email, password, done) =>{

        try{

            /*
            const normalizedEmail = email.toLowerCase().trim()

            const user = await validateLogin(normalizedEmail, password )

            if (!user) {
                return done( null , false , {
                    status: 'error',
                    message: 'Credenciales inválidas'
                })
            }
            */

            return done( null, user );
        }
        catch( error ){
            return done( error );
        }
     
    
    }   
))



passport.use('login', new LocalStrategy( 
    {   usernameField:'email', 
        passwordField:'password' , 
        passReqToCallback:true,
        session:false  
    },

    async ( req , email, password, done) =>{

        try{
            
            const normalizedEmail = email.toLowerCase().trim()

            const user = await validateLogin(normalizedEmail, password )

            if (!user) {
                return done( null , false , {
                    status: 'error',
                    message: 'Credenciales inválidas',
                    code: 401
                })
            }
       

            return done( null, user );
        }
        catch( error ){
            return done( error );
        }
     
    
    }   
))

/**
 * 
 * @param {import("express").Request} req 
 * @returns 
 */
const cookieExtractor = function(req) {
    var token = null;
    if (req && req.signedCookies ) {
        token = req.signedCookies.currentUser
    }
    return token;
};
// 

const jwtStrategyOptions = { 
        jwtFromRequest: cookieExtractor,
        secretOrKey: env.JWT_SECRET
}

async function jwtStrategyCallback( jwtPayload, done ) {

    try{
        const user = await getUserByEmail( jwtPayload.email )
        if( ! user ){
            return( null , false, {"error": "Usuario Incorrecto"})
        }

        return( done( null, user ) )
    }
    catch( error ){
        return done( error );
    }
}

passport.use('current' , new JwtStrategy( jwtStrategyOptions , jwtStrategyCallback ))
