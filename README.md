

# Passos para execução

1   -   Ter o node instalado versao >=16 
2   -   Conexão com um banco de dados mongo DB
3   -   Visual Studio Code instalado
4   -   abrir a pasta do projeto "mongoose-example" no VS Code
5   -   executar comando para instalar dependencias "npm install"
6   -   criar arquivo .env com as configurações de acesso ao mongo DB
        na raiz do projeto ao lado de src
        com as propriedades

        ```
        MONGODB_URI=mongodb://meuUsuario:minhaSenha@localhost:27017/teste?authSource=admin
        ```
7   -   npm run dev executa o script.
8   -   Organização :
        *   index.js é o script principal
        *   database.js é o script responsavel por conectar no banco ou emitir um erro de conexão.
        *   models/* possui todos os mapeametos "schema's" de collections do banco e do nosso script/projeto
9   -   caso não possua a instancia do banco no docker segue script
        docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=meuUsuario -e MONGO_INITDB_ROOT_PASSWORD=minhaSenha mongo




