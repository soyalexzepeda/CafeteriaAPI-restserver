// External package
const { request, response } = require('express');

// Models
const User = require('../models/user.model');

const validateAdminJWT = async ( req = request, res = response, next ) => {

     const uid = req.uid;

     // Get user from uid
     const user = await User.findById( uid );

     // Validate ADMIN user role
     if ( user.role !== 'ADMIN_ROLE' ) return res.status(401).json({
          message: `You do not have permission for this action. Only ADMIN user role`
     });

     next();
}

module.exports = {
     validateAdminJWT
}