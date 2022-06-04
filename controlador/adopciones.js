import model from '../model/adopciones.js'

const obtener = async (req,res) => {
    let { id } = req.params
    //console.log(id)
    if(id) {
        let adopciones = await model.read(id)
        res.json(adopciones)
    }
    else {
        let adopciones = await model.readAll()
        res.json(adopciones)
    }
}

const guardar = async (req,res) => {
    let adopciones = req.body

    let adopcionesGuardado = await model.create(adopciones)
    res.json(adopcionesGuardado)
}

const actualizar = async (req,res) => {
    let adopciones = req.body
    let { id } = req.params

    let adopcionesActualizado = await model.update(id, adopciones)
    res.json(adopcionesActualizado)
}

const borrar = async (req,res) => {
    let { id } = req.params

    let adopcionesBorrado =  await model.remove(id)
    res.json(adopcionesBorrado)
}

export default {
    obtener,
    guardar,
    actualizar,
    borrar
}