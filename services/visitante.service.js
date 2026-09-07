const VisitanteRepository = require('../infra/repositories/visitanterepository')
const Visitante = require('../core/entities/visitante')

class VisitanteService {
  constructor() {
    this.repository = new VisitanteRepository()
  }

  async listAll() {
    return this.repository.findAll()
  }

  async getById(id) {
    return this.repository.findById(id)
  }

  async registerVisitor(data) {
    if (!data.nombreCompleto || !data.cedula) {
      throw new Error('Nombre y cédula son requeridos')
    }
    return this.repository.create(data)
  }

  async search(nombre, cedula) {
    return this.repository.search(nombre, cedula)
  }
}

module.exports = VisitanteService