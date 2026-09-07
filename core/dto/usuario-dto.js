class UsuarioDTO {
  constructor(id, nombre, email, rolNombre, moduloAcceso) {
    this.id = id
    this.nombre = nombre
    this.email = email
    this.rolNombre = rolNombre
    this.moduloAcceso = moduloAcceso
  }
}

module.exports = UsuarioDTO