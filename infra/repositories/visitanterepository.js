const { Visitante: VisitanteModel } = require('../db/sequelize')
const Visitante = require('../../core/entities/visitante')
const VisitanteDTO = require('../../core/dto/visitante-dto')

class VisitanteRepository {
  async findAll() {
    const models = await VisitanteModel.findAll({ order: [['fechaRegistro', 'DESC']] })
    return models.map(m => new VisitanteDTO(m.id, m.nombreCompleto, m.cedula, m.qrCode, m.estado, m.fechaRegistro))
  }

  async findById(id) {
    const model = await VisitanteModel.findByPk(id)
    if (!model) return null
    return new VisitanteDTO(model.id, model.nombreCompleto, model.cedula, model.qrCode, model.estado, model.fechaRegistro)
  }

  async findByCedula(cedula) {
    const model = await VisitanteModel.findOne({ where: { cedula } })
    if (!model) return null
    return new VisitanteDTO(model.id, model.nombreCompleto, model.cedula, model.qrCode, model.estado, model.fechaRegistro)
  }

  async create(data) {
    const qrHelper = require('../utils/qr.helper')
    const qrCode = qrHelper.generateVisitorQR(data.nombreCompleto, data.cedula)

    const model = await VisitanteModel.create({
      nombreCompleto: data.nombreCompleto,
      cedula: data.cedula,
      qrCode,
      estado: 'registrado',
      fechaRegistro: new Date()
    })

    return new VisitanteDTO(model.id, model.nombreCompleto, model.cedula, model.qrCode, model.estado, model.fechaRegistro)
  }

  async search(nombre, cedula) {
    const where = {}
    if (nombre) where.nombreCompleto = { [Op.iLike]: `%${nombre}%` }
    if (cedula) where.cedula = cedula

    const models = await VisitanteModel.findAll({ where, order: [['fechaRegistro', 'DESC']] })
    return models.map(m => new VisitanteDTO(m.id, m.nombreCompleto, m.cedula, m.qrCode, m.estado, m.fechaRegistro))
  }
}

module.exports = VisitanteRepository