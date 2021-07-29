// External package
const { request, response } = require('express');

// Models
const User = require('../models/user.model');

const validatePermission = async ( req = request, res = response, next ) => {

     const { id } = req.params;
     const uid = req.uid;
     const personal = await User.findById( uid );

     if( personal.role !== 'ADMIN_ROLE' && uid !== id ) {
          return res.status(401).json({
               message: 'You do not have permission for this action'
          });
     }

     next();
}

module.exports = {
     validatePermission
}