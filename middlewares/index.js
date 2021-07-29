// Middlewares
const validateJWT = require('../middlewares/validate-jwt');
const validateUserJWT = require('../middlewares/validate-user-jwt');
const validateAdminJWT = require('../middlewares/validate-admin-jwt');
const validatePermission = require('../middlewares/validate-permission');
const userValidations = require('../middlewares/user-validations');

module.exports = {
     ...validateJWT,
     ...validateUserJWT,
     ...validateAdminJWT,
     ...validatePermission,
     ...userValidations,
}