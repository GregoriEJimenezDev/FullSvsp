const express = require('express')
const router = express.Router()
const { authMiddleware, rbacMiddleware } = require('../middlewares/auth.middleware')
const visitanteService = require('../services/visitante.service')
const qrHelper = require('../utils/qr.helper')

router.post('/visitantes', authMiddleware, rbacMiddleware(['adminpro', 'visitas']), async (req, res) => {
  try {
    const visitante = await visitanteService.registerVisitor(req.body)
    visitante.qrCode = qrHelper.generateVisitorQR(visitante.nombreCompleto, visitante.cedula)
    res.status(201).json(visitante)
  } catch (error) {
    res.status(400).json({ mensaje: error.message })
  }
})

router.get('/visitantes', authMiddleware, rbacMiddleware(['adminpro', 'visitas']), async (req, res) => {
  try {
    const visitantes = await visitanteService.listAll()
    res.json(visitantes)
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

router.get('/visitantes/search', authMiddleware, rbacMiddleware(['adminpro', 'visitas']), async (req, res) => {
  try {
    const { nombre, cedula } = req.query
    const resultados = await visitanteService.search(nombre, cedula)
    res.json(resultados)
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

module.exports = router