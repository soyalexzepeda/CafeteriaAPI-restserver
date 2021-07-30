// External package
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLECLIENTID );

const validateGoogle = async ( idToken ) => {
     
     const ticket = await client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLECLIENTID
     });
     const { name, email, picture: img } = ticket.getPayload();

     return { name, email, img }
}

module.exports = {
     validateGoogle
}