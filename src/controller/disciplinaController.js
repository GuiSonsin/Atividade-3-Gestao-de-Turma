const { DisciplinaModel } = require('../models/disciplina');
const { PessoaModel } = require("../models/pessoa");
const { TurmaModel } = require('../models/turma')
const { perguntar } = require('../perguntar');

 // CADASTRAR DISCIPLINAS
async function cadastrarDisciplina() {
    try {
        const nome = await perguntar('Digite o nome: ');

        const nomeUnico = await DisciplinaModel.findOne({nome: nome});
        
        if(nomeUnico !== null)
            return console.error('\nEste nome de disciplina já está cadastrado!');

        if(nome.trim().length === 0)
            return console.error('\nO campo nome é o brigatório e não pode ser vazio');

        const descricao = await perguntar('Digite a descricao: ');

        if(descricao.trim().length === 0)
            return console.error('\nO campo descricao é o brigatório e não pode ser vazio');

        const professor = await perguntar('Digite o ID do professor: ');
        
        if(professor.trim().length === 0)
            return console.error('\nO campo professor é o brigatório e não pode ser vazio');

        const professorEncontrado = await PessoaModel.findById(professor);

        if(professorEncontrado === null)
            return console.error('\nID de professor não encontrado, pois este ID está errado!')
        else if(professorEncontrado.tipo !== 'Professor') 
            return console.error('\nID não é de um professor, e sim de um Aluno!');

        const disciplina = new DisciplinaModel({ nome, descricao, professor});

        await disciplina.save();

        return console.log('\nDisciplina criada com sucesso!');
    } catch (err) {
        return console.error('\nErro ao cadastrar disciplina!');
    }
}

// MOSTRA TODAS AS DISCIPLINAS CADASTRADAS NO BANCO
async function mostrarTodasDisciplinasCadastradas() {
    try {
        let disciplina = await DisciplinaModel.find();
        return console.log("\nDisciplinas cadastradas:", disciplina);
    } catch (err) {
        return console.error("\nErro ao buscar disciplinas!");
    }
}

// CONSULTA DISCIPLINAS POR PROFESSOR
async function consultarDisciplinaPorProfessor() {
    try{
        const professor = await perguntar('Entre com o ID do Professor: ');

        const professorEncontrado = await PessoaModel.findById(professor);

        if(professorEncontrado === null)
            return console.error('\nID do Professor não existe!')
        else if (professorEncontrado.tipo !== 'Professor')
            return console.error('\nID não é de um Professor, e sim de um Aluno!')

        const disciplina = await DisciplinaModel.find({professor: {$in: professorEncontrado._id}});
        
        if(disciplina.length === 0)
            return console.log('\nEste professor não leciona nenhuma disciplina atualmente!')

        console.log('\nDisciplinas que o Professor leciona: \n', disciplina);
    }catch(err){
        console.error('\nErro ao consultar disciplinas por professor!')
    }
}

// CONSULTA TODAS AS DICIPLINAS QUE ESTAO VINCULADAS À UMA TURMA
async function consultarDisciplinasPorTurma() {
    try{
        const turma = await perguntar('Entre com o ID da Turma: ');

        const turmaEncontrada = await TurmaModel.findById(turma);

        if(turmaEncontrada === null)
            return console.error('\nID da Turma não existe!')

        const disciplinas = await DisciplinaModel.find({ _id: { $in: turmaEncontrada.disciplinas } });
        
        if(disciplinas.length === 0)
            return console.log('\nEste turma não possui nenhuma disciplina atualmente!')

        console.log('\nDisciplinas que estão vinculadas a turma: \n', disciplinas);
    }catch(err){
        console.error('\nErro ao consultar disciplinas por turma!')
    }
}

module.exports = {
    cadastrarDisciplina, 
    consultarDisciplinasPorTurma,
    mostrarTodasDisciplinasCadastradas, 
    consultarDisciplinaPorProfessor
}