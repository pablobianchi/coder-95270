import { randomBytes } from 'node:crypto'
import { createTicketRepository } from "../repositories/ticket.repository.js"
import { getEventByIdRepository } from '../repositories/event.repository.js'
import { enviarMail } from './mail.service.js'

const generateReservationCode = () => {
    return `TCK-${randomBytes(4).toString('hex').toUpperCase()}`
}



export const createTicketService = async ({ eventId, quantity = 1, user }) => {
    //const requestedQuantity = Number(quantity)
/*
    if (!Number.isInteger(requestedQuantity) || requestedQuantity <= 0) {
        throw new ServiceError('La cantidad debe ser un número entero mayor a cero', 400)
    }
*/
    const event = await getEventByIdRepository(eventId)
/*
    if (!event) {
        throw new ServiceError('Evento no encontrado', 404)
    }

    if (event.status !== 'published') {
        throw new ServiceError('El evento no está disponible para inscripciones', 400)
    }

    if (event.date <= new Date()) {
        throw new ServiceError('No es posible inscribirse a un evento finalizado', 400)
    }

    const existingTicket = await ticketRepository.findActiveTicketByUserAndEvent(user._id, event._id)

    if (existingTicket) {
        throw new ServiceError('Ya tenés una inscripción activa para este evento', 409)
    }

    const reserved = await ticketRepository.getReservedQuantityByEvent(event._id)
    const available = event.capacity - reserved

    if (requestedQuantity > available) {
        throw new ServiceError('No hay cupos suficientes disponibles', 400)
    }

    */

    const ticket = await createTicketRepository({
        user: user._id,
        event: event.id,
        quantity: quantity,
        reservationCode: generateReservationCode(),
        status: 'confirmed'
    })

    // Último paso: nunca se notifica algo que todavía no es un hecho en la base.
    enviarMail(
        user.email,
        'Nueva Reserva',
        `<h1>${ticket.reservationCode}</h1>`,
        ''
    )

    return ticket
}