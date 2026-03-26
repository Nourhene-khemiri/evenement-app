require('dotenv').config();

const app = require('./src/app');
const { sequelize, connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connexion AVEC la  DB
    await connectDB();

    await sequelize.sync({ alter: true }); 
  

    app.listen(PORT, () => {
      
    });

  } catch (error) {
  
  }
};

start();