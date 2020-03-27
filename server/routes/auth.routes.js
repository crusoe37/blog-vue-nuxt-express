const { Router } = require('express')
const { login, createUser } = require('../controllers/auth.contoller')
const router = Router()

router.post('/admin/login', login)
router.post('/admin/login', createUser)

module.exports = router
