import Usuario from '../models/usuario.model.js'
import bcrypt from 'bcryptjs'
import { generarToken } from '../helpers/index.js'

export const crearUsuario = (req, res, next) => {
  // Validar si el usuario ya existe
  Usuario.find({ email: req.body.email }).then((usuario) => {
    if (usuario) {
      return res.status(404).json({ ok: false, message: 'El email ya existe.' })
    }
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(req.body.password, salt)
    const usuarioObj = {
      username: req.body.username,
      email: req.body.email,
      password,
    }
    const nuevoUsuario = new Usuario(usuarioObj)
    nuevoUsuario.save().then((usuarioCreado) => {
      generarToken({
        usuarioId: usuarioCreado.id,
        email: usuarioCreado.email,
        username: usuarioCreado.username,
      }).then((token) => {
        res.json({ ok: true, usuario: usuarioCreado, token })
      })
    })
  })
}
export const buscarUsuarios = (req, res, next) => {
  Usuario.find().then((usuarios) => {
    res.json({ ok: true, usuarios })
  })
}
export const buscarUsuarioPorId = (req, res, next) => {
  Usuario.find().then((usuarios) => {
    const usuario = usuarios.find((u) => u.id === req.params.usuarioId)
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        message: 'El usuario no existe.',
      })
    }
    res.json({ ok: true, usuario })
  })
}
export const actualizarUsuario = (req, res, next) => {}
export const eliminarUsuario = (req, res, next) => {}
