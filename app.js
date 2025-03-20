import { existsSync } from 'node:fs'
import express from 'express'
import feedsRoutes from './routes/feed.route.js'
import usuariosRoutes from './routes/usuario.route.js'
import authRoutes from './routes/auth.route.js'
import { crearBaseDeDatos, dbDir } from './helpers/index.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

// Crear la base de datos
if (!existsSync(dbDir)) {
  crearBaseDeDatos(dbDir).then(console.log)
}

const app = express()
app.use(cors())

app.use(express.json())

app.use('/api/v1/feeds', feedsRoutes)
app.use('/api/v1/usuarios', usuariosRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(4000, console.log('Servidor corriendo en el puerto 4000'))
