// External package
const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
     return new Promise( ( resolve, reject ) => {
          const payload = { uid };
          jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
               expiresIn: '1h'
          }, ( err, token ) => {
               if( err ) {
                    reject('We cannot generate your token. Try agan later');
               } else {
                    resolve( token );
               }
          });
     });
}

module.exports = {
     generateJWT
}