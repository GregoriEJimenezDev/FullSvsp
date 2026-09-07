const AsistenciaRepository = require('../infra/repositories/asistencerepository')
const Asistencia = require('../core/entities/asistencia')

class AsistenciaService {
  constructor() {
    this.repository = new AsistenciaRepository()
  }

  async listAll(filters = {}) {
    return this.repository.findAll(filters)
  }

  async getByEmployee(empleadoId) {
    return this.repository.findByEmployee(empleadoId)
  }

  async registerEntryExit(data) {
    if (!data.empleadoId || !data.horaEntrada) {
      throw new Error('Empleado y hora de entrada son requeridos')
    }

    if (!data.horaSalida) {
      return this.repository.create({
        empleadoId: data.empleadoId,
        horaEntrada: data.horaEntrada,
        horaSalida: null,
        horasTotales: 0,
        fecha: data.fecha
      })
    }

    return this.repository.create(data)
  }

  async update(id, data) {
    return this.repository.update(id, data)
  }
}

module.exports = AsistenciaService