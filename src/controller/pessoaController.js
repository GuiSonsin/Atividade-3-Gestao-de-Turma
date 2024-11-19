const { PessoaModel } = require("../models/pessoa");
const { perguntar } = require('../perguntar');

// CADASTRA PESSOA, TANTO ALUNO QUANTO PROFESSOR
async function cadastrarPessoa() {
    try {
        const nome = await perguntar('Digite o nome: ');

        if(nome.trim().length === 0)
            return console.error('\nO campo nome é obrigatório, não pode ser vazio!');

        const email = await perguntar('Digite o e-mail: ');

        if(email.trim().length === 0)
            return console.error('\nEmail é obrigatório e não pode ser vazio!');

        const telefone = await perguntar('Digite o telefone: ');
        const dataNascimento = await perguntar('Digite a data de nascimento (MM/DD/YYYY): ');

        if(dataNascimento.trim().length === 0)
            return console.error('\nO campo data nascimento é obrigatório, não pode ser vazio!');

        const tipo = await perguntar('Digite o tipo ("Aluno" ou "Professor"): ');

        if(tipo !== 'Aluno' && tipo !== 'Professor'){
            return console.error('\nEste campo e só pode ser "Aluno" ou "Professor"!!')
        }

        let matricula = await perguntar('Digite a matrícula (OPCIONAL PARA PROFESSOR): ');

        if (tipo === 'Aluno') { 
            if(matricula.trim().length  === 0)
                return console.error('\nMatricula é obrigatória para Aluno e precisa conter pelo menos 1 caracter');
        }else{
            if(matricula.trim().length === 0){      
               matricula = null;
            }

            const matriculaUnica = await PessoaModel.findOne({matricula});
            
            if(matriculaUnica !== null && matricula !== null)
                return console.error('\nEsta matricula já foi cadastrada no sistema!')
        }

        const formacao = await perguntar('Digite a formação (OPCIONAL PARA ALUNO E PROFESSOR): ');

        const pessoa = new PessoaModel({ nome, email, telefone, dataNascimento, tipo, matricula, formacao});
        
        await pessoa.save()

        return console.log('\nPessoa criada com sucesso!');
    } catch (err) {
        if(err.code === 11000){
            return console.error('\nEmail ou Matricula ja existem no sistema!')
        }
        return console.error('\nErro ao cadastrar pessoa!', err);
    }
}

// MOSTRA TODAS AS PESSOAS CADASTRADAS NO BANCO
async function mostrarTodasPessoasCadastradas() {
    try {
        let pessoa = await PessoaModel.find();
        return console.log("\nPessoas cadastradas:", pessoa);
    } catch (err) {
        return console.error("\nErro ao buscar pessoas!");
    }
}

module.exports = {
    cadastrarPessoa, 
    mostrarTodasPessoasCadastradas
}