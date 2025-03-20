import { generarToken } from '../helpers/index.js'
import Usuario from '../models/usuario.model.js'
import bcrypt from 'bcryptjs'

export const login = (req, res, next) => {
  const { email, password } = req.body

  Usuario.find({ email }).then((usuario) => {
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        message: 'Credenciales incorrectas: email no existe',
      })
    }

    const passwordEsValida = bcrypt.compareSync(password, usuario.password)
    if (!passwordEsValida) {
      return res.status(404).json({
        ok: false,
        message: 'Credenciales incorrectas: password incorrecto',
      })
    }

    delete usuario.password

    // TODO: Generar token
    generarToken({
      usuarioId: usuario.id,
      email: usuario.email,
      username: usuario.username,
    }).then((token) => {
      res.json({ ok: true, usuario, token })
    })
  })
}
