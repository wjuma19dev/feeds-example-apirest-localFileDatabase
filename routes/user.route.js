import { Router } from 'express'
import {
  buscarUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.route('/').get(buscarUsuarios).post(crearUsuario)

userRouter
  .route('/:usuarioId')
  .get(buscarUsuarioPorId)
  .put(actualizarUsuario)
  .delete(eliminarUsuario)

export default userRouter
