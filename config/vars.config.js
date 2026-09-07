require('dotenv').config()

const path = require('path')

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  qrExpiry: process.env.QR_EXPIRY || '24h'
}

const required = ['JWT_SECRET', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']
const missing = required.filter(k => !process.env[k])

if (missing.length > 0 && process.env.NODE_ENV !== 'development') {
  console.error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`)
  process.exit(1)
}