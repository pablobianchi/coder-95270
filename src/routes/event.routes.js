import { Router } from "express";
import passport from "passport";
import { authorizeRoles, authorizeEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";

import { getEvents, getEventById, createEvent, updateEvent  } from "../controllers/event.controller.js";

const router = Router()

router.get('/', getEvents )
router.get('/:eventId', getEventById )

router.post('/', passport.authenticate('current', {session:false}) , authorizeRoles('admin','organizer') ,createEvent )


router.put('/:eventId', 
    passport.authenticate('current', {session:false}), 
    authorizeRoles('admin','organizer'),
    authorizeEventOwnerOrAdmin,
    updateEvent )

export default router