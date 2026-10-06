import { createEventService, getEventByIdService, findEventsService } from "../services/event.service.js"
import { transporter } from '../config/mail.js'
import { EventDetailDTO } from "../dto/event-detail.dto.js";




export const getEvents = async (req, res, next ) => {  
   try {    

        const lEvents = await findEventsService();
        const eventsDTO = lEvents.map(event => new EventDetailDTO(event))


        res.status(200).json({ message:"ok", data: eventsDTO })  
   } 
    catch (error) { 
        next(error)
        //res.status(500).json({ error: 'Error al obtener eventos - CATCH' , data: error }) 
    }
}

export const getEventById = async (req, res) => {  
    try {   
        const eventId = req.params.eventId
       res.status(200).json({ message:"ok", data: await getEventByIdService( eventId ) })  
    } 
    catch (error) { 
        console.log( error )
        res.status(500).json({ error: 'Error al obtener eventos' , data: error.toString() }) }
}


export const createEvent = async (req, res) => {  
    try {    

        const { title , description } = req.body

        if( !title || !description ){
            return res.status(400).json({error:"Datos de entrada insuficientes"} )
        }
        
        const newEvent = await createEventService( title, description, req.user );
        res.status(201).json({ message:"ok", data: newEvent })  
        
    } 
    catch (error) { 
        console.log( error);
        res.status(500).json({ error: 'Error al crear el Evento' })
    }
}

export const updateEvent = async (req, res) => {  
    try {    

        /*
        const { title , description } = req.body

        if( !title || !description ){
            return res.status(400).json({error:"Datos de entrada insuficientes"} )
        }
        
        const newEvent = await createEventService( title, description, req.user );
        res.status(201).json({ message:"ok", data: newEvent })  
        */
        res.status(200).json({ message:"ok", data: req.event })  
    } 
    catch (error) { 
        console.log( error);
        res.status(500).json({ error: 'Error al crear el Evento' })
    }
}