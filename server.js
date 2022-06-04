import express from 'express'
import routerProductos from './router/productos.js'
import routerVolantes from './router/volantes.js'
import db from './model/db.js'
import cors from 'cors'


/* await  */db.conectar()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
/*
14

Instale la dependencia cors en su proyecto:

npm i --save cors
Agregue a su archivo de configuración del servidor lo siguiente:

var cors = require('cors'); o import cors from 'cors'

app.use(cors());
*/

app.get('/ping', (req,res) => {
    res.send('pong')
})


app.use('/api/productos', routerProductos)
app.use('/api/volantes', routerVolantes)


const PORT = process.env.PORT || 8080   //Short Circuit Operator
const server = app.listen(PORT, 
    () => console.log(`Servidor APIRestful escuchando en el puerto ${PORT}`)
)
server.on('error', err => console.log(`Error en servidor: ${err.message}`))
