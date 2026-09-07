class IUsuarioRepository {
  async findByEmail(email) {}
  async findById(id) {}
  async create(data) {}
  async update(id, data) {}
  async activate(id) {}
  async deactivate(id) {}
}

module.exports = IUsuarioRepository