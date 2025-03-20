export const getTokenFromHeader = (req) => {
  const token = req.headers['x_token']
  return token ? token : null
}
