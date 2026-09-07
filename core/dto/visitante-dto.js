class VisitanteDTO {
  constructor(id, nombreCompleto, cedula, qrCode, estado, fechaRegistro) {
    this.id = id
    this.nombreCompleto = nombreCompleto
    this.cedula = cedula
    this.qrCode = qrCode
    this.estado = estado
    this.fechaRegistro = fechaRegistro
  }
}

module.exports = VisitanteDTO