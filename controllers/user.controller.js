import Usuario from '../models/user.model.js'

export const crearUsuario = (req, res, next) => {
  const usuario = new Usuario(req.body)
  usuario.save().then((usuarioCreado) => {
    res.json({ ok: true, usuario: usuarioCreado })
  })
}
export const buscarUsuarios = (req, res, next) => {}
export const buscarUsuarioPorId = (req, res, next) => {}
export const actualizarUsuario = (req, res, next) => {}
export const eliminarUsuario = (req, res, next) => {}
