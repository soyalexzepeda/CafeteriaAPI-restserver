// External package
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { userValidations } = require('../middlewares/user-validations');

// Controllers
const { login, google } = require('../controllers/auth.controllers');

const router = Router();

router.post('/login', [
     check('email', 'The email is required').not().isEmpty(),
     check('password', 'The password is required').not().isEmpty(),
     userValidations
], login );

router.post('/google', [
     check('id_token', 'The id_token is required').not().isEmpty(),
     userValidations
], google );

module.exports = router;