import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

/**
 * Genera un JWT firmado a partir de un payload mínimo (sin datos sensibles).
 * La expiración se toma de JWT_EXPIRES_IN (variables de entorno), con '1h' como default.
 * @param {{ id: string, email: string, role: string }} payload
 * @returns {string} Token JWT firmado.
 */
export const generateToken = payload => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN
    })
}

/**
 * Verifica la firma y la expiración de un JWT.
 * Lanza un error (token inválido o expirado) si la verificación falla —
 * quien la use debe envolverla en try/catch.
 * @param {string} token
 * @returns {{ id: string, email: string, role: string, iat: number, exp: number }} Payload decodificado.
 */
export const verifyToken = token => {
    return jwt.verify(token, env.JWT_SECRET)
}
