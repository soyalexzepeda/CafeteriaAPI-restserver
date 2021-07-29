// Models
const User = require('../models/user.model');
const Role = require('../models/role.model');

const validateIDExist = async ( id ) => {
     const idExist = await User.findById( id );
     if( !idExist ) throw new Error(`The ID does not exist in database`);
}

const validateEmailRepeat = async ( email ) => {
     const emailRepeat = await User.findOne( { email } );
     if( emailRepeat ) throw new Error(`The email is already exist`);
}

const validateRoleExist = async ( role ) => {
     const roleExist = await Role.findOne( { role } );
     if( !roleExist ) throw new Error(`The role does not exist. Only ADMIN_ROLE or USER_ROLE`);
}

module.exports = {
     validateIDExist,
     validateEmailRepeat,
     validateRoleExist
}