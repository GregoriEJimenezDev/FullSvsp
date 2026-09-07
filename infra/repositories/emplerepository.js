const { Empleado: EmpleadoModel } = require('../db/sequelize')
const Empleado = require('../../core/entities/empleado')
const EmpleadoDTO = require('../../core/dto/empleado-dto')

class EmpleadoRepository {
  async findAll() {
    const models = await EmpleadoModel.findAll({ where: { activo: true } })
    return models.map(m => new EmpleadoDTO(m.id, m.nombre, m.departamento, m.activo))
  }

  async findById(id) {
    const model = await EmpleadoModel.findByPk(id)
    if (!model) return null
    return new EmpleadoDTO(model.id, model.nombre, model.departamento, model.activo)
  }

  async findByDepartment(dept) {
    const models = await EmpleadoModel.findAll({ where: { departamento: dept, activo: true } })
    return models.map(m => new EmpleadoDTO(m.id, m.nombre, m.departamento, m.activo))
  }

  async create(data) {
    const model = await EmpleadoModel.create({
      nombre: data.nombre,
      departamento: data.departamento,
      activo: true
    })
    return new EmpleadoDTO(model.id, model.nombre, model.departamento, model.activo)
  }

  async update(id, data) {
    const model = await EmpleadoModel.findByPk(id)
    if (!model) return null
    model.nombre = data.nombre
    model.departamento = data.departamento
    await model.save()
    return new EmpleadoDTO(model.id, model.nombre, model.departamento, model.activo)
  }

  async softDelete(id) {
    const model = await EmpleadoModel.findByPk(id)
    if (!model) return false
    model.activo = false
    await model.save()
    return true
  }
}

module.exports = EmpleadoRepository