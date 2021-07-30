// External package
const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

// Models
const User = require('../models/user.model');

// Helpers
const { generateJWT } = require('../helpers/generate-jwt');
const { validateGoogle } = require('../helpers/validate-google');

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

          res.status(200).json({
               user,
               token
          });

     } catch (error) {
          res.status(500).json({
               message: 'Internal Several Error'
          });
     }
}

const google = async ( req = request, res = response ) => {

     const { id_token } = req.body;

     try {
          
          const { name, email, img } = await validateGoogle( id_token );
          
          let user = await User.findOne({ email });

          if( !user ) {
               const data = {
                    name,
                    email,
                    password: process.env.PASS,
                    img,
                    google: true
               }
          
               const { password } = data;
               user = new User( data );

               // Encrypt password
               const salt = bcryptjs.genSaltSync();
               user.password = bcryptjs.hashSync( password, salt );

               await user.save();
          }

          // When the user it's blocked
          if ( !user.status ) return res.status(401).json({
               message: 'The user is blocked, you should to talk with your administrator'
          });

          // Generate jsonwebtoken
          const token = await generateJWT( user.id ); 

          res.status(200).json({
               message: 'Google user sing in successfully',
               user,
               token
          });
     
          
     } catch (error) {
          res.status(401).json({
               message: 'The google token not is valid'
          });
     }
}

module.exports = {
     login,
     google
}