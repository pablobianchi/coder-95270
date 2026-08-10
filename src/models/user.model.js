import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'El Nombre del Usuario es obligatorio.'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'El Apellido del Usuario es obligatorio.'],
        trim: true,
    }},
    { 
    timestamps: true 
});

export const UserModel = model('users', userSchema);