import mongoose from "mongoose"
import db from "./db.js"

const volanteSchema = mongoose.Schema({
    idUsuario: String,
    tipoAnimal: String,
    url_imagen: String,
    descripción: String,
    ubicacion: String,
    telefono: String,
})

const VolanteModel = mongoose.model('volantes', volanteSchema)

/*
{
    "idUsuario": "as3432",
    "tipoAnimal": "Gato",
    "url_imagen": "./img/perros5.jfif",
    "descripción": "Se perdió el 5 de agosto por la noche, llevaba un collar azul",
    "ubicacion": "Barracas",
    "telefono": "11234256234"
}
*/
// ------------- CRUD hacia MongoDB -----------------
async function readAll() {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let volantes = await VolanteModel.find({})
        console.log(volantes)
        return volantes
    }
    catch(error) {
        console.log('Error en lectura de volantes:', error.message)
        return []
    }
}

async function read(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let volante = await VolanteModel.findOne({_id:id})
        console.log(volante)
        return volante
    }
    catch(error) {
        console.log('Error en lectura de volante:', error.message)
        return {}
    }
}

async function create(volante) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let volanteModel = new VolanteModel(volante)
        await volanteModel.save()

        //leo el volante agregado
        let volantes = await VolanteModel.find({})
        let volanteAgregado = volantes[volantes.length - 1]
        return volanteAgregado
    }
    catch(error) {
        console.log('Error en inserción de volante:', error.message)
        return {}
    }
}

async function update(id,volante) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        await VolanteModel.updateOne({_id:id},{ $set: volante })
        let volanteActualizado = await VolanteModel.findOne({ _id:id })

        console.log(volanteActualizado)
        return volanteActualizado
    }
    catch(error) {
        console.log('Error en actualización de volante:', error.message)
        return {}
    }
}

async function remove(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let volanteEliminado = await VolanteModel.findOne({_id:id})
        console.log(volanteEliminado)

        await VolanteModel.deleteOne({_id:id})
        return volanteEliminado
    }
    catch(error) {
        console.log('Error en borrado de volante:', error.message)
        return {}
    }
}

export default {
    readAll,
    read,
    create,
    update,
    remove
}