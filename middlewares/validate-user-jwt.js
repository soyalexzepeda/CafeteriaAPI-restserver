// External package
const { request, response } = require("express")

// Models
const User = require('../models/user.model');

const validateUserJWT = async ( req = request, res = response, next ) => {
     
     const uid = req.uid;

     // Get user from uid
     const user = await User.findById( uid );

     // Validate user exist in database
     if( !user ) return res.status(400).json({
          message: `The user with id ${ uid } does not exist in database`
     });

     // Validate user status true
     if ( !user.status ) return res.status(400).json({
          message: `The user with id ${ uid } does not exist`
     });

     next();
}

module.exports = {
     validateUserJWT
}