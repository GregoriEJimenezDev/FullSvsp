class Justificacion {
  constructor(id, empleadoId, tipo, fechaInicio, fechaFin, descripcion) {
    this.id = id
    this.empleadoId = empleadoId
    this.tipo = tipo
    this.fechaInicio = fechaInicio
    this.fechaFin = fechaFin
    this.descripcion = descripcion
  }
}

module.exports = Justificacion