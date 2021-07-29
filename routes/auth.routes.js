// External package
const { Router } = require('express');

// Controllers
const { login } = require('../controllers/auth.controllers');

const router = Router();

router.post('/login', login )

module.exports = router;