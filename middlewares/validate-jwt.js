// External package
const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validateJWT = async ( req = request, res = response, next ) => {
     const token = req.header('x-token');

     // Verify if token exist
     if( !token ) {
          return res.status(400).json({
               message: 'The token does not exist. Please log in first'
          });
     }

     try {
          // Getting token & register in headers
          const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
          req.uid = uid;

          next();

     } catch (error) {
          res.status(401).json({
               message: 'Your token it is wrong, was manipulated or expired'
          });
     }
}

module.exports = {
     validateJWT
}