import { Router } from "express";
import passport from "passport";
import { register, login, logout, current } from "../controllers/session.controller.js";



const router = Router()


router.post('/register', register )
router.post('/login', passport.authenticate('login', { session: false }),
    
    /*,

    (err, user, info) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al registrar el usuario',
                info: err.toString()
            })
        }

        if (!user) {
            const code = info?.code || '401'
            const message = info?.message || 'Credenciales inválidas'

            return res.status(code).json({ status: 'error', message })
        }

        // Éxito: dejamos el usuario en req.user, igual que hace Passport
        // automáticamente en la forma sin callback, y seguimos a register().
        req.user = user

        next()
    })(req, res, next)

 , */
 login )
  
router.post('/logout', logout)
router.get('/current', passport.authenticate('current' , {session:false}), current )


export default router