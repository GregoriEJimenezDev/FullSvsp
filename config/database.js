require('dotenv').config()

const { Sequelize } = require('sequelize')

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, JWT_SECRET, JWT_EXPIRY } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
})

module.exports = sequelize