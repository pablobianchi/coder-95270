import { Router } from "express";
import passport from "passport";
import { register, login, logout, current } from "../controllers/session.controller.js";



const router = Router()


const loginUser = (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al identifica al usuario',
                info: err.toString()
            })
        }

        if (!user) {
            const message = info?.message || 'Datos inválidos'           
            return res.status(401).json({ status: 'error', message })
        }

        // Éxito: dejamos el usuario en req.user, igual que hace Passport
        // automáticamente en la forma sin callback, y seguimos a login().
        req.user = user

        next()
    })(req, res, next)
}

router.post('/register', register )
router.post('/login',loginUser,login )
router.post('/logout', logout)
router.get('/current', passport.authenticate('current' , {session:false}), current )


export default router