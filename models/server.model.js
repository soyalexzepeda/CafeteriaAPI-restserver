// External package
const express = require('express');
const cors = require('cors');

// Configurations
const { conn } = require('../database/config.database');

class Server {

     constructor() {
          this.app = express();
          this.port = process.env.PORT;

          //Paths
          this.authPath = '/api/auth';
          this.userPath = '/api/users';

          // Connection
          this.connection();

          // Middlewares
          this.middlewares();

          // 
          this.routes();
     }

     connection() {
         conn(); 
     }

     middlewares() {

          // Enable cors
          this.app.use( cors() );

          // Parser data from body to JSON
          this.app.use( express.json() );

          // Static content
          this.app.use( express.static( 'public' ) );
     }

     routes() {
          this.app.use( this.authPath, require('../routes/auth.routes') );
          this.app.use( this.userPath, require('../routes/user.routes') );
     }

     listen() {
          this.app.listen( this.port, () => {
               console.log(`Connected to server from port ${ this.port }`);
          });
     }
}

module.exports = Server;