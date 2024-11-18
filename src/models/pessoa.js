const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email:{type: String, required: true, unique: true},
    telefone:{type: String, required: false},
    dataNascimento: {type: Date, required: true},
    tipo:{type: String, required: true ,enum: ['Professor', 'Aluno']},
    matricula: {type: String, unique: true}, 
    formacao: {type: String},
    dataCadastro: {type: Date, default: Date.now()}
});

const PessoaModel = mongoose.model('Pessoa', pessoaSchema);

module.exports = { pessoaSchema, PessoaModel } 