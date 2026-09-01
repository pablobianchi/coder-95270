import { Router } from "express";
import { register, login, current } from "../controllers/session.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"


const router = Router()


router.post('/register', register )
router.post('/login', login )
router.get('/current', authMiddleware, current )


export default router