import { Router } from "express";
import { UserModel } from "../models/user.model.js";


const router = Router()

router.get('/',  async (req, res) => {  
    try {    
        res.json({ message: await UserModel.find({}) })  
    } 
    catch (error) { 
        res.status(500).json({ error: 'Error al obtener Usuarios' }) }
})


router.post('/', async (req, res) => {  
    try {    
        res.json({ message: 'Usuario Creado' })  
    } 
    catch (error) { 
        res.status(500).json({ error: 'Error al crear el Usuario' }) }
})


export default router