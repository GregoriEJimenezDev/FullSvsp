class IAsistenciaRepository {
  async findAll(filters = {}) {}
  async findByEmployee(empleadoId) {}
  async create(data) {}
  async update(id, data) {}
}

module.exports = IAsistenciaRepository