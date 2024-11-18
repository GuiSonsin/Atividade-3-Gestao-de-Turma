const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
   nome: {type: String, required: true},
   ano:{type: Number, required: true},
   alunos: [{
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Pessoa',  
    required: true
}],
disciplinas: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Disciplina',  
    required: true
}],
   dataInicio:{type: Date, required: true},
   dataTermino: {type: Date, required: true}
});

const TurmaModel = mongoose.model('Turma', turmaSchema);

module.exports = { turmaSchema, TurmaModel }