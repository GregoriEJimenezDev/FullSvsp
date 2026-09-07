const { Justificacion: JustificacionModel } = require('../db/sequelize')
const JustificacionDTO = require('../../core/dto/justificacion-dto')

class JustificacionRepository {
  async findAll(filters = {}) {
    const where = {}
    if (filters.empleadoId) where.empleadoId = filters.empleadoId
    if (filters.tipo) where.tipo = filters.tipo

    const models = await JustificacionModel.findAll({ where, include: ['empleado'] })
    return models.map(m => new JustificacionDTO(m.id, m.empleadoId, m.tipo, m.fechaInicio, m.fechaFin, m.descripcion))
  }

  async findByEmployee(empleadoId) {
    const models = await JustificacionModel.findAll({ where: { empleadoId }, include: ['empleado'] })
    return models.map(m => new JustificacionDTO(m.id, m.empleadoId, m.tipo, m.fechaInicio, m.fechaFin, m.descripcion))
  }

  async findByRange(filters) {
    const where = {}
    if (filters.fechaInicio) where.fechaFin = { [Op.gte]: filters.fechaInicio }
    if (filters.fechaFin) where.fechaInicio = { [Op.lte]: filters.fechaFin }
    if (filters.empleadoId) where.empleadoId = filters.empleadoId

    const models = await JustificacionModel.findAll({ where, include: ['empleado'] })
    return models.map(m => new JustificacionDTO(m.id, m.empleadoId, m.tipo, m.fechaInicio, m.fechaFin, m.descripcion))
  }

  async create(data) {
    const model = await JustificacionModel.create({
      empleadoId: data.empleadoId,
      tipo: data.tipo,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      descripcion: data.descripcion
    })
    return new JustificacionDTO(model.id, model.empleadoId, model.tipo, model.fechaInicio, model.fechaFin, model.descripcion)
  }
}

module.exports = JustificacionRepository