// External package
const mongoose = require('mongoose');

const conn = async () => {
     try {
          await mongoose.connect( process.env.MONGO_CNN, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false
          });
          console.log('Connected to database successfully');
     } catch (error) {
          throw new Error('Ups! Some went wrong to database connection');
     }
}

module.exports = {
     conn
}