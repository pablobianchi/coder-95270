/**
 * Error de negocio lanzado desde la capa de servicios.
 * Lleva un statusCode HTTP asociado para que el middleware de errores
 * (src/middlewares/error.middleware.js, desde clase 8) lo traduzca
 * directamente en la respuesta, sin que el service conozca nada de Express.
 */
export class ServiceError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = 'ServiceError'
        this.statusCode = statusCode
    }
}
