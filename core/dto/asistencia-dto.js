class AsistenciaDTO {
  constructor(id, empleadoId, horaEntrada, horaSalida, horasTotales, fecha) {
    this.id = id
    this.empleadoId = empleadoId
    this.horaEntrada = horaEntrada
    this.horaSalida = horaSalida
    this.horasTotales = horasTotales
    this.fecha = fecha
  }
}

module.exports = AsistenciaDTO