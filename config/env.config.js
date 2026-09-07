require('dotenv').config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'svsp-jwt-secret-key-change-in-production',
  jwtExpiry: process.env.JWT_EXPIRY || '1d',
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  adminPort: process.env.ADMIN_PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development'
}