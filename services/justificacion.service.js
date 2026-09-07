const JustificacionRepository = require('../infra/repositories/justificacionrepository')
const Justificacion = require('../core/entities/justificacion')

class JustificacionService {
  constructor() {
    this.repository = new JustificacionRepository()
  }

  async listAll(filters = {}) {
    return this.repository.findAll(filters)
  }

  async getByEmployee(empleadoId) {
    return this.repository.findByEmployee(empleadoId)
  }

  async getByRange(filters) {
    return this.repository.findByRange(filters)
  }

  async create(justificacionData) {
    if (!justificacionData.empleadoId || !justificacionData.tipo || !justificacionData.fechaInicio) {
      throw new Error('Empleado, tipo y fecha de inicio son requeridos')
    }

    if (justificacionData.fechaFin && new Date(justificacionData.fechaFin) < new Date(justificacionData.fechaInicio)) {
      throw new Error('Fecha fin debe ser posterior o igual a fecha inicio')
    }

    return this.repository.create(justificacionData)
  }
}

module.exports = JustificacionService