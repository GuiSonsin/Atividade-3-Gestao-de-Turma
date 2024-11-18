const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: {type: String, required: true},
    professor: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Pessoa',  
        required: true
    }
});

const DisciplinaModel = mongoose.model('Disciplina', disciplinaSchema);

module.exports = { disciplinaSchema, DisciplinaModel } 