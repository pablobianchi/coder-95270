import express from 'express'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.routes.js'
import eventRoutes from './routes/event.routes.js'
import sessionRoutes from './routes/session.routes.js'

import './config/passport.js'

import passport from 'passport'

import { env } from './config/env.js'


const app = express()

app.use(express.json())
app.use(cookieParser( env.COOKIE_SECRET ) )

app.use( passport.initialize())

app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/sessions', sessionRoutes)

app.get('/api/health', (req, res)=>{

    res.status(200).json({data:"ok"});

})


// Si ninguna ruta anterior respondió, la URL no existe.
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});


export default app;