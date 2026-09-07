class Usuario {
  constructor(id, nombre, email, passwordHash, rolId, activo = true) {
    this.id = id
    this.nombre = nombre
    this.email = email
    this.passwordHash = passwordHash
    this.rolId = rolId
    this.activo = activo
  }

  checkPassword(password) {
    return this.passwordHash === password
  }
}

module.exports = Usuario