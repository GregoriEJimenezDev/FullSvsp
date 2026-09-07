class Visitante {
  constructor(id, nombreCompleto, cedula, qrCode, estado = 'registrado', fechaRegistro) {
    this.id = id
    this.nombreCompleto = nombreCompleto
    this.cedula = cedula
    this.qrCode = qrCode
    this.estado = estado
    this.fechaRegistro = fechaRegistro
  }

  generateQR() {
    const crypto = require('crypto')
    const data = `${this.nombreCompleto}|${this.cedula}|${this.fechaRegistro}`
    this.qrCode = crypto.createHash('sha256').update(data).digest('hex')
  }

  static verifyQR(qrCode, nombre, cedula, fechaRegistro) {
    const data = `${nombre}|${cedula}|${fechaRegistro}`
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    return qrCode === hash
  }
}

module.exports = Visitante