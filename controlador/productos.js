import model from '../model/productos.js'

const obtener = async (req,res) => {
    let { id } = req.params
    //console.log(id)
    if(id) {
        let producto = await model.read(id)
        res.json(producto)
    }
    else {
        let productos = await model.readAll()
        res.json(productos)
    }
}

const guardar = async (req,res) => {
    let producto = req.body

    let productoGuardado = await model.create(producto)
    res.json(productoGuardado)
}

const actualizar = async (req,res) => {
    let producto = req.body
    let { id } = req.params

    let productoActualizado = await model.update(id, producto)
    res.json(productoActualizado)
}

const borrar = async (req,res) => {
    let { id } = req.params

    let productoBorrado =  await model.remove(id)
    res.json(productoBorrado)
}

export default {
    obtener,
    guardar,
    actualizar,
    borrar
}