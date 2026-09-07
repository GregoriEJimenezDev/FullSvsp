const ExcelJS = require('exceljs')
const path = require('path')
const fs = require('fs')

const reportsDir = path.join(__dirname, '..', 'generated-reports')
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true })
}

async function exportToExcel(data, headers, filename) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Reporte')

  worksheet.addRow(headers)
  worksheet.getRow(1).font = { bold: true }

  data.forEach(item => {
    const row = []
    headers.forEach(h => {
      const value = item[h] !== undefined ? item[h] : ''
      row.push(value)
    })
    worksheet.addRow(row)
  })

  const filepath = path.join(reportsDir, filename)
  await workbook.write(filepath)
  return filepath
}

async function exportToPDF(data, headers, filename) {
  const PDFDocument = require('pdfkit')
  const doc = new PDFDocument()
  const filepath = path.join(reportsDir, filename)
  
  const stream = require('fs').createWriteStream(filepath)
  doc.pipe(stream)
  
  doc.fontSize(10)
  headers.forEach((h, i) => {
    doc.text(h, 50 + (i * 150), 50)
  })
  
  data.slice(0, 200).forEach((item, index) => {
    let y = 70 + (index * 20)
    headers.forEach((h, i) => {
      const value = item[h] !== undefined ? item[h] : ''
      doc.text(`${h}: ${value}`, 50, y)
      y += 15
    })
  })
  
  await new Promise((resolve, reject) => {
    doc.end()
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
  
  return filepath
}

module.exports = { exportToExcel, exportToPDF }