import { EventDAO } from '../dao/event.dao.js'
import { EventDetailDTO } from "../dto/event-detail.dto.js";

class EventRepository {  

    constructor( dao ){
        this.dao = dao 
    }


    createEvent = async( title, description, organizer ) => {

    try{  
        const newEvent = await this.dao.create({
            title: title,
            description: description,
            organizer:organizer
        });

        
        return new EventDetailDTO( newEvent )

    }
    catch( error ){
        throw error
    }

    }

   getEventById = async( eventId ) => {

    try{
        const event = await this.dao.findById( eventId )
        .populate('organizer')
        
        return new EventDetailDTO( event )
    }
    catch( error ){
        throw error
    }

    }

    findEvents = async( title, sort, skip, limit ) => {

    //
    try{
        const lEvents = await this.dao.find({})
        
        /*
        .sort(sort)
        .skip(skip)
        .limit(limit)
        */

        return lEvents
    }
    catch( error ){

        console.log( error )
        throw error
    }

    }

    findAvailableEvents = async( title, sort, skip, limit ) => {

        try{
            const lEvents = await this.dao.find({status: "123"})
            
            /*
            .sort(sort)
            .skip(skip)
            .limit(limit)
            */

            return lEvents
        }
        catch( error ){

            console.log( error )
            throw error
        }

    }
}

export const eventRepository = new EventRepository( new EventDAO() )
