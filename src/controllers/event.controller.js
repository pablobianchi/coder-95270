import { EventModel } from "../models/event.model.js"



export const getEvents = async (req, res) => {  
    try {    
        res.status(200).json({ message:"ok", data: await EventModel.find({}) })  
    } 
    catch (error) { 
        res.status(500).json({ error: 'Error al obtener eventos' }) }
}


export const createEvent = async (req, res) => {  
    try {    
        res.status(201).json({ message:"ok", data: 'Evento Creado' })  
    } 
    catch (error) { 
        res.status(500).json({ error: 'Error al crear el Evento' }) }
}