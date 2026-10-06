import { EventModel } from "../models/event.model.js";

export class EventDAO{
    
    async create(data) {    
        return EventModel.create(data).lean()
    }

    async getById(id) {    
        return EventModel.findById(id).lean()
    }

    async find(){
        return EventModel.find({}).populate('organizer').lean()
    }

}