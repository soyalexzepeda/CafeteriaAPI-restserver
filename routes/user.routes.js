// External package
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const {
     validateJWT,
     validateUserJWT,
     validateAdminJWT,
     validatePermission,
     userValidations
} = require('../middlewares');

// Helpers
const { 
     validateEmailRepeat, 
     validateRoleExist, 
     validateIDExist 
} = require('../helpers/validate-user-fields');

// Controllers
const { 
     getUsers, 
     postUsers, 
     putUsers, 
     deleteUsers 
} = require('../controllers/user.controllers');


// Initialized router
const router = Router();

router.get('/', [
     validateJWT,
     validateUserJWT
], getUsers );

router.post('/', [
     validateJWT,
     validateUserJWT,
     validateAdminJWT,
     check('name', 'The name is required').not().isEmpty(),
     check('email', 'The email is required').not().isEmpty(),
     check('email', 'The email is not valid').isEmail(),
     check('email').custom( validateEmailRepeat ),
     check('password', 'The password is required').not().isEmpty(),
     check('password', 'The password should is min 6 characters').isLength( { min: 6 } ),
     check('role', 'The role is required').not().isEmpty(),
     check('role').custom( validateRoleExist ),
     userValidations
], postUsers );

router.put('/:id', [
     validateJWT,
     validateUserJWT,
     check('id', 'The ID not is valid').isMongoId(),
     check('id').custom( validateIDExist ),
     validatePermission,
     userValidations
], putUsers ); 

router.delete('/:id', [
     validateJWT,
     validateUserJWT,
     check('id', 'The ID not is valid').isMongoId(),
     check('id').custom( validateIDExist ),
     validatePermission,
     userValidations
], deleteUsers );

module.exports = router;