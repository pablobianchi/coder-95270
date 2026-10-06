import { eventRepository } from "../repositories/event.repository.js";
import { enviarMail } from "./mail.service.js";
import { ServiceError } from "../utils/service-error.js";


export const createEventService = async( title, description, organizer ) => {

    try{  

        //validamos el contenido
        // Ejemplo de como gestionar un error
        //throw new ServiceError( "La fecha debe ser posterior al día de hoy" , 422 );

        const newEvent = eventRepository.createEvent(title,description,organizer);

        return newEvent

    }
    catch( error ){
        throw error;
    }

}

export const getEventByIdService = async( eventId ) => {

    try{
        const event = await eventRepository.getEventById( eventId )

        enviarMail( "demo@coder.com", "Mail con el Evento", "<h1>"+event.title+"</h1>" , event.title );

        return event
    }
    catch( error ){
        throw error
    }

}


export const findEventsService = async(  ) => {

    try{
        const lEvents = await eventRepository.findEvents( '', '', 0, 0 )

        return lEvents
    }
    catch( error ){
        throw error
    }

}