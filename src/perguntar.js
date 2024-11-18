const readline = require('readline');

const rl = readline.createInterface({ // constante para pegarmos entradas do teclado
    input: process.stdin, 
    output: process.stdout 
  });

// funcao criada para escrever perguntas no console
function perguntar(pergunta) {
    return new Promise((resolve) => {
      rl.question(pergunta, (resposta) => {
        resolve(resposta);
      });
    });
  }

module.exports = {
    perguntar
}