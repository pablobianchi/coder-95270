import app from './app.js'
import mongoose from 'mongoose'

const connectDB = async () => {  
    try {   
        await mongoose.connect('mongodb://localhost:27017/95270')    
        console.log('Base de datos conectada')  
    } catch (error) {    
        console.error('Error al conectar MongoDB', error)  
    }
}

await connectDB()

app.listen( 3000, () => {
    console.log(`Servidor escuchando peticiones en el puerto: 3000`);
});