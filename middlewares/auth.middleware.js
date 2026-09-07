const jwt = require('jsonwebtoken')

function generarToken(id, rolNombre) {
  return jwt.sign({ id, rol: rolNombre }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '1d' })
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token de autorización requerido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = {
      id: payload.id,
      rol: payload.rol
    }
    next()
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' })
  }
}

function rbacMiddleware(modulosPermitidos) {
  return async (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' })
    }

    if (req.usuario.rol === 'adminpro') {
      return next()
    }

    if (modulosPermitidos && !modulosPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: `No tiene acceso al módulo. Roles permitidos: ${modulosPermitidos.join(', ')}` })
    }

    next()
  }
}

module.exports = { generarToken, authMiddleware, rbacMiddleware }