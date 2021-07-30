// External package
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
     name: {
          type: String,
          required: [true, 'The name is required']
     },
     email: {
          type: String,
          unique: true,
          required: [true, 'The email is required']
     },
     password: {
          type: String,
          required: [true, 'The password is required']
     },
     role: {
          type: String,
          default: 'USER_ROLE',
          required: [true, 'The role is required']
     },
     img: {
          type: String
     },
     google: {
          type: Boolean,
          default: false
     },
     status: {
          type: Boolean,
          default: true
     }
});

UserSchema.methods.toJSON = function() {
     const { __v, _id, password, ...user } = this.toObject();
     user.uid = _id;
     return user; 
}

module.exports = model( 'User', UserSchema );