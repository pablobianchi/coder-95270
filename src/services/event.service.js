import { createEventRepository, getEventByIdRepository, findEventsRepository } from "../repositories/event.repository.js";

export const createEventService = async( title, description, organizer ) => {

    try{  
        const newEvent = createEventRepository(title,description,organizer);

        return newEvent

    }
    catch( error ){
        throw error
    }

}

export const getEventByIdService = async( eventId ) => {

    try{
        const event = await getEventByIdRepository( eventId )

        return event
    }
    catch( error ){
        throw error
    }

}


export const findEventsService = async(  ) => {

    try{
        const lEvents = await findEventsRepository( '', '', 0, 0 )

        return lEvents
    }
    catch( error ){
        throw error
    }

}