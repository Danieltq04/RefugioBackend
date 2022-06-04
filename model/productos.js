import mongoose from "mongoose"
import db from "./db.js"

const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    descripcion: String,
    codigo: String
})

const ProductoModel = mongoose.model('productos', productoSchema)


// ------------- CRUD hacia MongoDB -----------------
async function readAll() {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let productos = await ProductoModel.find({})
        console.log(productos)
        return productos
    }
    catch(error) {
        console.log('Error en lectura de productos:', error.message)
        return []
    }
}

async function read(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let producto = await ProductoModel.findOne({_id:id})
        console.log(producto)
        return producto
    }
    catch(error) {
        console.log('Error en lectura de producto:', error.message)
        return {}
    }
}

async function create(producto) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let productoModel = new ProductoModel(producto)
        await productoModel.save()

        //leo el producto agregado
        let productos = await ProductoModel.find({})
        let productoAgregado = productos[productos.length - 1]
        return productoAgregado
    }
    catch(error) {
        console.log('Error en inserción de producto:', error.message)
        return {}
    }
}

async function update(id,producto) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        await ProductoModel.updateOne({_id:id},{ $set: producto })
        let productoActualizado = await ProductoModel.findOne({ _id:id })

        console.log(productoActualizado)
        return productoActualizado
    }
    catch(error) {
        console.log('Error en actualización de producto:', error.message)
        return {}
    }
}

async function remove(id) {
    try {
        if(!db.getConexion()) throw new Error('Error de conexión a base de datos')

        let productoEliminado = await ProductoModel.findOne({_id:id})
        console.log(productoEliminado)

        await ProductoModel.deleteOne({_id:id})
        return productoEliminado
    }
    catch(error) {
        console.log('Error en borrado de producto:', error.message)
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