const { Sequelize } = require('sequelize')
const config = require('../../config/database')

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
    }
  }
)

const Empleado = sequelize.define('Empleado', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: Sequelize.STRING, allowNull: false },
  departamento: { type: Sequelize.STRING },
  activo: { type: Sequelize.BOOLEAN, defaultValue: true }
})

const Asistencia = sequelize.define('Asistencia', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  empleadoId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Empleado, key: 'id' } },
  horaEntrada: { type: Sequelize.STRING, allowNull: false },
  horaSalida: { type: Sequelize.STRING },
  horasTotales: { type: Sequelize.FLOAT },
  fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

const Justificacion = sequelize.define('Justificacion', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  empleadoId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Empleado, key: 'id' } },
  tipo: { type: Sequelize.STRING, allowNull: false },
  fechaInicio: { type: Sequelize.DATE, allowNull: false },
  fechaFin: { type: Sequelize.DATE, allowNull: false },
  descripcion: { type: Sequelize.TEXT }
})

const Visitante = sequelize.define('Visitante', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nombreCompleto: { type: Sequelize.STRING, allowNull: false },
  cedula: { type: Sequelize.STRING, allowNull: false, unique: true },
  qrCode: { type: Sequelize.STRING, allowNull: false },
  estado: { type: Sequelize.STRING, defaultValue: 'registrado' },
  fechaRegistro: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

const asociarModelos = () => {
  Empleado.hasMany(Asistencia, { foreignKey: 'empleadoId' })
  Asistencia.belongsTo(Empleado, { foreignKey: 'empleadoId' })
  Empleado.hasMany(Justificacion, { foreignKey: 'empleadoId' })
  Justificacion.belongsTo(Empleado, { foreignKey: 'empleadoId' })
}

module.exports = { sequelize, Empleado, Asistencia, Justificacion, Visitante, asociarModelos }