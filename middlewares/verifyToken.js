import jwt from 'jsonwebtoken'
export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
