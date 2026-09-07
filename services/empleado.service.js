const EmpleadoRepository = require('../infra/repositories/emplerepository')
const Empleado = require('../core/entities/empleado')

class EmpleadoService {
  constructor() {
    this.repository = new EmpleadoRepository()
  }

  async listAll() {
    return this.repository.findAll()
  }

  async getById(id) {
    return this.repository.findById(id)
  }

  async create(empleadoData) {
    if (!empleadoData.nombre || !empleadoData.departamento) {
      throw new Error('Nombre y departamento son requeridos')
    }
    return this.repository.create(empleadoData)
  }

  async update(id, data) {
    return this.repository.update(id, data)
  }

  async delete(id) {
    return this.repository.softDelete(id)
  }

  async restore(id) {
    return this.repository.update(id, { activo: true })
  }
}

module.exports = EmpleadoService