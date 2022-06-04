import mongoose from "mongoose"
import db from "./db.js"
/*
const adopcionSchema = mongoose.Schema({
    idUsuario: String,
    tipoAnimal: String,
    url_imagen: String,
    descripción: String,
    ubicacion: String,
    telefono: String,
})*/
const adopcionSchema = mongoose.Schema({
    idRefugio: String,
    ubicacionRefugio: String,
    telefonoRefugio: String,
    url_imagen: String,
    tipoAnimal: String,
    sexo: String,
    tamanio: String,
    raza: String,
    descripción: String,
})
/*
{
    "idRefugio": "as3432",
    "ubicacionRefugio": "as3432",
    "telefonoRefugio": "as3432",
    "url_imagen": "as3432",
    "tipoAnimal": "Gato",
    "sexo": "./img/perros5.jfif",
    "tamanio": "Se perdió el 5 de agosto por la noche, llevaba un collar azul",
    "raza": "Barracas",
    "descripción": "11234256234"
}*/
const AdopcionModel = mongoose.model('adopciones', adopcionSchema)


// ------------- CRUD hacia MongoDB -----------------
async function readAll() {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let adopciones = await AdopcionModel.find({})
        console.log(adopciones)
        return adopciones
    }
    catch(error) {
        console.log('Error en lectura de adopciones:', error.message)
        return []
    }
}

async function read(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let adopcion = await AdopcionModel.findOne({_id:id})
        console.log(adopcion)
        return adopcion
    }
    catch(error) {
        console.log('Error en lectura de adopcion:', error.message)
        return {}
    }
}

async function create(adopcion) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let adopcionModel = new AdopcionModel(adopcion)
        await adopcionModel.save()

        //leo el adopcion agregado
        let adopciones = await AdopcionModel.find({})
        let adopcionAgregado = adopciones[adopciones.length - 1]
        return adopcionAgregado
    }
    catch(error) {
        console.log('Error en inserción de adopcion:', error.message)
        return {}
    }
}

async function update(id,adopcion) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        await AdopcionModel.updateOne({_id:id},{ $set: adopcion })
        let adopcionActualizado = await AdopcionModel.findOne({ _id:id })

        console.log(adopcionActualizado)
        return adopcionActualizado
    }
    catch(error) {
        console.log('Error en actualización de adopcion:', error.message)
        return {}
    }
}

async function remove(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let adopcionEliminado = await AdopcionModel.findOne({_id:id})
        console.log(adopcionEliminado)

        await AdopcionModel.deleteOne({_id:id})
        return adopcionEliminado
    }
    catch(error) {
        console.log('Error en borrado de adopcion:', error.message)
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