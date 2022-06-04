import mongoose from 'mongoose'
import config from '../config.js'

let conexion = false

/* function getConexion() {
    return conexion
} */

//const getConexion = () => conexion
const getConexion = _ => conexion

async function conectar() {
    try {
        console.log('Conectando a la base de datos...')
        await mongoose.connect(config.STR_CNX, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
        conexion = true
    }
    catch(error) {
        console.log(`Error en conexión de base de datos: ${error.message}`)
    }
}

export default {
    conectar,
    getConexion
}
