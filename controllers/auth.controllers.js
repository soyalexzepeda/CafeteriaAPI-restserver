// External package
const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

// Models
const User = require('../models/user.model');

// Helpers
const { generateJWT } = require('../helpers/generate-jwt');

const login = async ( req = request, res = response ) => {

     const { email, password } = req.body;

     try {
          // Verify email exist
          const user = await User.findOne( { email } );
          if( !user ) return res.status(400).json({
               message: 'The email does not exist'
          });

          // Verify that password is correct TODO
          const correctPass = bcryptjs.compareSync( password, user.password );
          if( !correctPass ) return res.status(400).json({
               message: 'The password is incorrect'
          }); 

          // Verify status
          if ( !user.status ) return res.status(400).json({
               message: 'The user was deleted from database'
          });

          // Generate jsonwebtoken
          const token = await generateJWT( user.id );

          res.json({
               user,
               token
          });
     } catch (error) {
          res.status(500).json({
               message: 'Internal several error'
          });
     }
}

module.exports = {
     login
}