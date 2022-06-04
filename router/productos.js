import express from 'express'
const router = express.Router()

import controlador from '../controlador/productos.js'

router.get('/:id?', controlador.obtener)

router.post('/', controlador.guardar)

router.put('/:id', controlador.actualizar)

router.delete('/:id', controlador.borrar)


export default router
