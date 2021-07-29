// External package
const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

// Models
const User = require('../models/user.model');

const getUsers = async ( req = request, res = response ) => {

     const { limit, skip } = req.query;
     const query = { status: true };

     const [ total, users ] = await Promise.all([
          User.countDocuments( query ),

          User.find( query )
               .limit( Number( limit ) )
               .skip( Number( skip ) )
     ]);

     res.json({
          total,
          users
     });
}

const postUsers = async ( req = request, res = response ) => {

     const { name, email, password, role } = req.body;
     
     // Instance new user
     const user = new User( { name, email, password, role } );

     // Encrypt password
     const salt = bcryptjs.genSaltSync();
     user.password = bcryptjs.hashSync( password, salt );

     await user.save();

     res.status(201).json({
          message: 'The user has been created successfully',
          user
     });
}

const putUsers = async ( req = request, res = response ) => {

     const { id } = req.params;
     const { _id, email, password, google, status, ...body } = req.body;

     // TODO: resolve email & password problem

     if ( password ) {
          const salt = bcryptjs.genSaltSync();
          body.password = bcryptjs.hashSync( password, salt );  
     }

     const user = await User.findByIdAndUpdate( id, body );

     res.status(201).json({
          message: 'The user has been updated successfully',
          user
     });
}

const deleteUsers = async ( req = request, res = response ) => {

     const { id } = req.params;

     await User.findByIdAndUpdate( id, { status: false } );

     res.status(200).json({
          message: 'The user has been deleted successfully'
     });
}

module.exports = {
     getUsers,
     postUsers,
     putUsers,
     deleteUsers
}