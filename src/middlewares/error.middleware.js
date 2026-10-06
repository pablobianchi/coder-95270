import { env } from "../config/env.js"

export const errorHandler = (error, req, res, next) => {
    // ServiceError (reglas de negocio) y errores HTTP de Express, como un
    // JSON mal formado en el body (400): ya traen su código y un mensaje
    // pensado para el cliente.
    if (error.statusCode) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message })
    }


    // Cualquier otra cosa es un error no esperado: se loguea completo en el
    // servidor y al cliente le llega un mensaje genérico. El detalle técnico
    // solo se muestra fuera de producción.
    console.error(error)

    res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor',
        ...(env.NODE_ENV !== 'production' && { info: error.message })
    })
}