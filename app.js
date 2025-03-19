import { existsSync } from 'node:fs'
import express from 'express'
import feedsRoutes from './routes/feed.route.js'
import usuariosRoutes from './routes/user.route.js'
import { crearBaseDeDatos, dbDir } from './helpers/index.js'

// Crear la base de datos
if (!existsSync(dbDir)) {
  crearBaseDeDatos(dbDir).then(console.log)
}

const app = express()

app.use(express.json())

app.use('/api/v1/feeds', feedsRoutes)
app.use('/api/v1/usuarios', usuariosRoutes)

app.listen(3000, console.log('Servidor corriendo en el puerto 3000'))
