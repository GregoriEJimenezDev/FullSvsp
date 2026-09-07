class Empleado {
  constructor(id, nombre, departamento, activo = true) {
    this.id = id
    this.nombre = nombre
    this.departamento = departamento
    this.activo = activo
  }

  softDelete() {
    this.activo = false
  }

  reactivate() {
    this.activo = true
  }

  update(nombre, departamento) {
    this.nombre = nombre
    this.departamento = departamento
  }
}

module.exports = Empleado