import { Schema, model } from 'mongoose';


const ticketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'El usuario del ticket es obligatorio.'],
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'events',
        required: [true, 'El evento del ticket es obligatorio.'],
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'confirmed',
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, 'La cantidad debe ser al menos 1.'],
    },
    reservationCode: {
        type: String,
        required: [true, 'El código de reserva es obligatorio.'],
        unique: true,
    },
    cancelledAt: {
        type: Date,
        default: null,
    },
},
{
    // createdAt (fecha de la inscripción) y updatedAt los agrega Mongoose.
    timestamps: true
});

export const TicketModel = model('tickets', ticketSchema);
