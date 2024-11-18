const { TurmaModel } = require('../models/turma');
const { PessoaModel } = require("../models/pessoa");
const { DisciplinaModel } = require('../models/disciplina');
const { perguntar } = require('../perguntar');

// CADASTRAR TURMAS
async function cadastrarTurma() {
    try {
        const nome = await perguntar('Digite o nome: ');

        if(nome.trim().length === 0)
            return console.error('\nO campo nome é obrigatório, não pode ser vazio!');

        const ano = await perguntar('Digite o ano letivo: ');

        if(ano.trim().length === 0)
            return console.error('\nO campo ano é obrigatório, não pode ser vazio!');

        const aluno = await perguntar('Entre com o ID dos alunos (separados por vírgula ou espaço): ');

        if(aluno.trim().length === 0)
            return console.error('\nO campo aluno é obrigatório, não pode ser vazio!');

        const disciplina = await perguntar('Entre com o ID das disciplinas (separados por vírgula ou espaço): ');

        if(disciplina.trim().length === 0)
            return console.error('\nO campo disciplina é obrigatório, não pode ser vazio!');

        // MANEIRA DE CONSEGUIRMOS ADICIONAR MAIS DE UM ID DE ALUNO E DISCIPLINA
        const alunos = aluno.split(/[, ]+/).filter(id => id.trim() !== '');
        const disciplinas = disciplina.split(/[, ]+/).filter(id => id.trim() !== '');

        // DESCONSIDERA OS IDS REPETIDOS
        const alunosUnicos = [...new Set(alunos)];
        const disciplinasUnicas = [...new Set(disciplinas)];
    
        // VERIFICA SE OS IDS PASSADOS SÃO VERDADEIROS E DO TIPO ALUNO
        const alunosEncontrados = await PessoaModel.find({
            _id: { $in: alunosUnicos },
            tipo: 'Aluno'
        });

        // VERIFICA DA SEGUINTE FORMA, SE O TAMANHO DO VETOR DE ALUNOS PASSADOS (ANULANDO OS REPETIDOS) É IGUAL AO TAMANHO DO VETOR ENCONTRADO NA PessoaModel AI ESTA TUDO CERTO, SE ESTIVER DIFERENTE, QUER DIZER QUE NAO PODE ENCONTRAR UM OU MAIS IDS QUE FORAM PASSADOS
        if (alunosEncontrados.length !== alunosUnicos.length) {
            return console.error('\nUm ou mais IDs de alunos não existem ou não são do tipo "Aluno".');
        }

        // A MESMA COISA PARA OS ALUNOS, IRÁ VERIFICAR SE OS IDS PASSADOS DAS DISCIPLINAS, SÃO REALMENTE DISCIPLINAS
        const disciplinasEncontradas = await DisciplinaModel.find({
            _id: { $in: disciplinasUnicas }
        });

        // A MESMA LOGICA PARA O QUE DESCREVEMOS PARA alunosEncontrados, PORÉM UTILIZAMOS PARA AS DISCIPLINAS
        if (disciplinasEncontradas.length !== disciplinasUnicas.length) {
            return console.error('\nUm ou mais IDs de disciplinas não existem!');
        }

        const dataInicio = await perguntar('Entre com a data inicial das atividades da turma (MM/DD/YYYY): ');

        if(dataInicio.trim().length === 0)
            return console.error('\nO campo data inicial é obrigatório, não pode ser vazio!');

        const dataTermino = await perguntar('Entre com a data final das atividades da turma (MM/DD/YYYY): ');

        if(dataTermino.trim().length === 0)
            return console.error('\nO campo data final é obrigatório, não pode ser vazio!');

        const turma = new TurmaModel({ nome, ano, alunos : alunosUnicos, disciplinas : disciplinasUnicas, dataInicio, dataTermino});

        await turma.save();
        
        return console.log(`\nTurma criada com sucesso para o ano letivo ${ano}!`);
    } catch (err) {
        return console.error('\nErro ao cadastrar turma!');
    }
}

// MOSTRA TODAS AS TURMAS CADASTRADAS NO BANCO
async function mostrarTodasTurmasCadastradas() {
    try {
        let turmas = await TurmaModel.find();
        return console.log("\nTurmas cadastradas:", turmas);
    } catch (err) {
        return console.error("\nErro ao buscar turmas!");
    }
}

// REMOVE ALUNO DE UMA TURMA
async function removerAlunoTurma() {
    try {
        const turma = await perguntar('Entre com o ID da turma: ');
        const aluno = await perguntar('Entre com o ID do aluno que deseja remover: ')

        const turmaEncontrada = await TurmaModel.findById(turma);
        const alunoEncontrado = await PessoaModel.findById(aluno);

        if(turmaEncontrada === null){
            return console.error('\nID da turma não existe!');
        }

        if(alunoEncontrado === null){
            return console.error('\nID do aluno não existe!');
        }else if(alunoEncontrado.tipo === 'Professor'){
            return console.error('\nID não é de um aluno e sim de um Professor!')
        }

        // percorre o array para ver se o aluno esta cadastrado na turma
        const alunoNaTurma = turmaEncontrada.alunos.some(
            alunoComparacao => alunoComparacao.toString() === aluno
        );

        if(!alunoNaTurma){
            return console.error('\nEste aluno não está nesta turma!');
        }else{
            const indexDoAluno = turmaEncontrada.alunos.indexOf(aluno); // irá buscar o index do aluno 
            turmaEncontrada.alunos.splice(indexDoAluno, 1); // primeiro parametro é o que será removido (neste caso, será removido o aluno) e o segundo parametro quantas remoções iremos fazer
        }

        await turmaEncontrada.save(); 

        console.log('\nAluno removido com sucesso!');

    } catch (error) {
        console.error('\nErro ao remover um aluno da turma!');
    }
}

// CONSULTA TODOS OS ALUNOS POR TURMA
async function consultarAlunosPorTurma() {
    try{
        const turma = await perguntar('Entre com o ID da turma: ');
        const turmaEncontrada = await TurmaModel.findById(turma);
    
        if(turmaEncontrada === null){
            return console.error('\nID da turma não existe!');
        }

        // busca todas as informações de cada aluno atravez do ID
        const aluno = await PessoaModel.find({ _id: { $in: turmaEncontrada.alunos } })

        if(aluno.length === 0)
            return console.log('\nNão há nenhum aluno nesta turma!')

        return console.log('\nAlunos encontrados na turma\n', aluno);
    }catch(err){
        console.error('\nErro ao buscar alunos por turma!');
    } 
}

// ADICIONA ALUNO À TURMA
async function adicionarAlunoNaTurma(){
    try{
         const turma = await perguntar('Entre com o ID da turma: ');
         const turmaEncontrada = await TurmaModel.findById(turma);
 
         if(turmaEncontrada === null){
             return console.error('\nID da turma não existe!');
         }
 
         const aluno = await perguntar('Entre com o ID do aluno: ');
         const alunoEncontrado = await PessoaModel.findById(aluno);
 
         // percorre o array para ver se o aluno ja esta cadastrado na turma
         const alunoNaTurma = turmaEncontrada.alunos.some(
             alunoComparacao => alunoComparacao.toString() === aluno
         );
 
         if(alunoEncontrado === null ){
             return console.error('\nID do aluno existe!')
         }else if(alunoEncontrado.tipo === 'Professor'){
             return console.error('\nEste ID não é de um aluno, e sim de um Professor!');
         }else if(alunoNaTurma){
             return console.error('\nAluno já pertence à turma!');
         }
 
         turmaEncontrada.alunos.push(aluno); // adiciona aluno na turma

         await turmaEncontrada.save(); // salva a turma com o aluno novo
 
         console.log('\nAluno adicionado à turma com sucesso!');
    }catch(err){
         console.error('\nErro ao adicionar um aluno à turma!');
    }  
 }

 module.exports = {
    mostrarTodasTurmasCadastradas, 
    cadastrarTurma, 
    adicionarAlunoNaTurma, 
    removerAlunoTurma, 
    consultarAlunosPorTurma
 }