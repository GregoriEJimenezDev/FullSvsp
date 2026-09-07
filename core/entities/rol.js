class Rol {
  constructor(id, nombre, permisosModulos) {
    this.id = id
    this.nombre = nombre
    this.permisosModulos = permisosModulos || []
  }

  tieneAcceso(modulo) {
    return this.permisosModulos.includes(modulo) || this.nombre === 'adminpro'
  }
}

module.exports = Rol