require('dotenv').config()
const express = require('express')
const { sequelize, asociarModelos } = require('./infra/db/sequelize')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const empleadoRouter = require('./routes/empleado.routes')
const visitanteRouter = require('./routes/visitante.routes')

app.use('/api/empleados', empleadoRouter)
app.use('/api/visitantes', visitanteRouter)

app.get('/', (req, res) => {
  res.json({ mensaje: 'SVSP Backend API', status: 'running' })
})

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida')
    return sequelize.sync({ alter: true })
  })
  .then(() => {
    asociarModelos()
    console.log('Modelos sincronizados con base de datos')
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error al iniciar el servidor:', err)
  })

module.exports = app