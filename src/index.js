const connectDB = require('./database');

const { cadastrarPessoa, mostrarTodasPessoasCadastradas } = require('./controller/pessoaController');

const { cadastrarDisciplina, mostrarTodasDisciplinasCadastradas, consultarDisciplinaPorProfessor, consultarDisciplinasPorTurma } = require('./controller/disciplinaController');

const { mostrarTodasTurmasCadastradas, cadastrarTurma, adicionarAlunoNaTurma, removerAlunoTurma, consultarAlunosPorTurma } = require('./controller/turmaController');

const { perguntar } = require('./perguntar');

async function execute() {
    let escolha = -5;
    
    while (escolha != 12) {

    const resposta = await perguntar('\nO que deseja fazer?\n1: Cadastrar Nova Pessoa\n2: Ver todas Pessoas Cadastradas\n3: Cadastrar Nova Disciplina\n4: Ver todas Disciplinas Cadastradas\n5: Cadastrar Nova Turma\n6: Ver todas Turmas Cadastradas\n7: Adicionar um aluno à alguma turma\n8: Remover um Aluno de uma Turma\n9: Consultar Todos os Alunos de uma Turma\n10: Consultar Todas as Disciplinas por Turma\n11: Consultar Todas as Disciplinas por Professor\n12: Sair do Sistema\nEscolha: ');
    
    escolha = parseInt(resposta); 

    switch (escolha) {
        case 1:
            await cadastrarPessoa();
            break;
        case 2:
            await mostrarTodasPessoasCadastradas();
            break;
        case 3:
            await cadastrarDisciplina();
            break;
        case 4:
            await mostrarTodasDisciplinasCadastradas();
            break;
        case 5:
            await cadastrarTurma();
            break;
        case 6:
            await mostrarTodasTurmasCadastradas();
            break;
        case 7:
            await adicionarAlunoNaTurma();
            break;
        case 8:
            await removerAlunoTurma();
            break; 
        case 9:
            await consultarAlunosPorTurma();
            break;
        case 10:
            await consultarDisciplinasPorTurma();
            break;
        case 11:
            await consultarDisciplinaPorProfessor();  
            break; 
        case 12:
            console.log('\nSaindo...')
            process.exit(1);
        default:         
            console.error('\nOpção Inválida!')
    }
    }
}

// Conectar ao MongoDB
connectDB()
    .then(execute)
    .catch(console.error)
    .finally(() => {
        process.exit(1);
    });