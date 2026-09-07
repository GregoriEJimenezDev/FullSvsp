const qrcode = require('qrcode')
const path = require('path')
const fs = require('fs')

const qrDir = path.join(__dirname, '..', 'generated-qrs')
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true })
}

function generateVisitorQR(nombre, cedula) {
  const data = `visitante|${nombre}|${cedula}`
  return qrcode.sync(data, { errorCorrectionLevel: 'H', scale: 8 })
}

function generateAttendanceQR(empleadoId, nombre, departamento) {
  const data = `asistencia|${empleadoId}|${nombre}|${departamento}`
  return qrcode.sync(data, { errorCorrectionLevel: 'H', scale: 8 })
}

module.exports = { generateVisitorQR, generateAttendanceQR }