class IVisitanteRepository {
  async findAll() {}
  async findById(id) {}
  async findByCedula(cedula) {}
  async create(data) {}
  async search(nombre, cedula) {}
}

module.exports = IVisitanteRepository