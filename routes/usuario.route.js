import { Router } from 'express'
import {
  buscarUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../controllers/usuario.controller.js'
import { isAuth } from '../middlewares/is-auth.js'
const userRouter = Router()

userRouter.get('/', buscarUsuarios)
userRouter.post('/', crearUsuario)

userRouter
  .route('/:usuarioId')
  .get(buscarUsuarioPorId)
  .put(actualizarUsuario)
  .delete(eliminarUsuario)

export default userRouter
