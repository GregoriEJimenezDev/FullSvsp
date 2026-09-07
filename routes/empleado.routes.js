const express = require('express')
const router = express.Router()
const { authMiddleware, rbacMiddleware } = require('../middlewares/auth.middleware')
const empleadoService = require('../services/empleado.service')

router.post('/empleados', authMiddleware, rbacMiddleware(['adminpro']), async (req, res) => {
  try {
    const empleado = await empleadoService.create(req.body)
    res.status(201).json(empleado)
  } catch (error) {
    res.status(400).json({ mensaje: error.message })
  }
})

router.get('/empleados', authMiddleware, rbacMiddleware(['adminpro', 'asistencias']), async (req, res) => {
  try {
    const empleados = await empleadoService.listAll()
    res.json(empleados)
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

router.get('/empleados/:id', authMiddleware, rbacMiddleware(['adminpro', 'asistencias']), async (req, res) => {
  try {
    const empleado = await empleadoService.getById(req.params.id)
    if (!empleo) return res.status(404).json({ mensaje: 'Empleado no encontrado' })
    res.json(empleado)
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

router.put('/empleados/:id', authMiddleware, rbacMiddleware(['adminpro']), async (req, res) => {
  try {
    const empleado = await empleadoService.update(req.params.id, req.body)
    if (!empleado) return res.status(404).json({ mensaje: 'Empleado no encontrado' })
    res.json(empleado)
  } catch (error) {
    res.status(400).json({ mensaje: error.message })
  }
})

router.patch('/empleados/:id/inhabilitar', authMiddleware, rbacMiddleware(['adminpro']), async (req, res) => {
  try {
    await empleadoService.softDelete(req.params.id)
    res.json({ mensaje: 'Empleado inhabilitado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: error.message })
  }
})

module.exports = router