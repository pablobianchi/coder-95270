import { createTicketService } from "../services/ticket.service.js";
import { isValidObjectId } from "../utils/validation.utils.js";



export const createTicket = async (req, res) => {
    try {

        if (!isValidObjectId(req.params.eventId)) {
            res.status(400).json('Id de evento inválido')
        }



        const ticket = await createTicketService({
            eventId: req.params.eventId,
            quantity: req.body?.quantity,
            user: req.user
        })

        res.status(201).json({
            status: 'success',
            message: 'Inscripción realizada correctamente',
            payload: ticket
        })
    }
    catch (error) {
        res.status(500).json({data:error.toString()})
        //sendServiceError(res, error, 'Error al crear la inscripción')
    }
}


