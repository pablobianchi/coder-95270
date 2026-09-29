import { Router } from "express";
import passport from "passport";

import { createTicket } from "../controllers/ticket.controller.js";

const router = Router()




router.post('/:eventId', 
    passport.authenticate('current', {session:false}), 
    createTicket )

export default router