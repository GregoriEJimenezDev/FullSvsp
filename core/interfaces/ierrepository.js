class IEmpleadoRepository {
  async findAll() {}
  async findById(id) {}
  async findByDepartment(dept) {}
  async create(data) {}
  async update(id, data) {}
  async softDelete(id) {}
}

module.exports = IEmpleadoRepository