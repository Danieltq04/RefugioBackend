import model from '../model/volantes.js'

const obtener = async (req,res) => {
    let { id } = req.params
    //console.log(id)
    if(id) {
        let volante = await model.read(id)
        res.json(volante)
    }
    else {
        let volante = await model.readAll()
        res.json(volante)
    }
}

const guardar = async (req,res) => {
    let volante = req.body

    let volanteGuardado = await model.create(volante)
    res.json(volanteGuardado)
}

const actualizar = async (req,res) => {
    let volante = req.body
    let { id } = req.params

    let volanteActualizado = await model.update(id, volante)
    res.json(volanteActualizado)
}

const borrar = async (req,res) => {
    let { id } = req.params

    let volanteBorrado =  await model.remove(id)
    res.json(volanteBorrado)
}

export default {
    obtener,
    guardar,
    actualizar,
    borrar
}