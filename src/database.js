const mongoose = require('mongoose');

const MONGODB_URI  = 'mongodb://meuUsuario:minhaSenha@localhost:27017/atividadeEmGrupo?authSource=admin';

 async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log('Conexão com o MongoDB realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;