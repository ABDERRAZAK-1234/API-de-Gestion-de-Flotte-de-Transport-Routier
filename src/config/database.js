const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connectée avec succé');
        
    }catch(error){
        console.log('Erreur lors de la connexion avec mongoDB, ',error.message);
        process.exit(1);
    }
};

module.exports = connectDB;