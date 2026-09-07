const { Asistencia: AsistenciaModel } = require('../db/sequelize')
const { Op } = require('sequelize')
const AsistenciaDTO = require('../../core/dto/asistencia-dto')

class AsistenciaRepository {
  async findAll(filters = {}) {
    const where = {}
    if (filters.empleadoId) where.empleadoId = filters.empleadoId
    if (filters.fechaInicio) where.fecha = { [Op.gte]: filters.fechaInicio }
    if (filters.fechaFin) where.fecha = { ...where.fecha, [Op.lte]: filters.fechaFin }

    const models = await AsistenciaModel.findAll({ where, include: ['empleado'] })
    return models.map(m => new AsistenciaDTO(m.id, m.empleadoId, m.horaEntrada, m.horaSalida, m.horasTotales, m.fecha))
  }

  async findByEmployee(empleadoId) {
    const models = await AsistenciaModel.findAll({ where: { empleadoId }, include: ['empleado'] })
    return models.map(m => new AsistenciaDTO(m.id, m.empleadoId, m.horaEntrada, m.horaSalida, m.horasTotales, m.fecha))
  }

  async create(data) {
    const horaEntrada = new Date(`1970-01-01T${data.horaEntrada}`)
    const horaSalida = new Date(`1970-01-01T${data.horaSalida}`)
    const diffMs = horaSalida - horaEntrada
    const horasTotales = Math.round((diffMs / 3600000) * 100) / 100

    const model = await AsistenciaModel.create({
      empleadoId: data.empleadoId,
      horaEntrada: data.horaEntrada,
      horaSalida: data.horaSalida,
      horasTotales: horasTotales,
      fecha: data.fecha || new Date()
    })
    return new AsistenciaDTO(model.id, model.empleadoId, model.horaEntrada, model.horaSalida, model.horasTotales, model.fecha)
  }

  async update(id, data) {
    const model = await AsistenciaModel.findByPk(id)
    if (!model) return null

    if (data.horaEntrada) model.horaEntrada = data.horaEntrada
    if (data.horaSalida) model.horaSalida = data.horaSalida
    if (data.fecha) model.fecha = data.fecha

    const horaEntrada = new Date(`1970-01-01T${model.horaEntrada}`)
    const horaSalida = new Date(`1970-01-01T${model.horaSalida}`)
    const diffMs = horaSalida - horaEntrada
    model.horasTotales = Math.round((diffMs / 3600000) * 100) / 100

    await model.save()
    return new AsistenciaDTO(model.id, model.empleadoId, model.horaEntrada, model.horaSalida, model.horasTotales, model.fecha)
  }
}

module.exports = AsistenciaRepository