import { getTokenFromHeader } from './getTokenFromHeader.js'
import { verifyToken } from './verifyToken.js'

export const isAuth = (req, res, next) => {
  const token = getTokenFromHeader(req)
  if (!token) {
    return res
      .status(401)
      .json({ ok: false, message: 'No existe token en la peticion.' })
  }
  verifyToken(token)
    .then((payload) => {
      req.usuario = {
        username: payload.username,
        id: payload.usuarioId,
        email: payload.email,
      }
      next()
    })
    .catch((err) => {
      return res
        .status(401)
        .json({ ok: false, message: 'Token invalido o expirado.' })
    })
}
