import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título del evento es obligatorio.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria.'],
        trim: true,
    },
    organizer:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:[true, 'El Organizer es obligatorio'],
    }},
    {
        timestamps: true
    });

export const EventModel = model('events', eventSchema);