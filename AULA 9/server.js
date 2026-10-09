// NOSSA API DE CACHORROS
//=============================
//
// Agora as fotos não são mais baixadas automaticamente!.
// Elas DEVEM existir manualmente na pasta 
// data/fotos
//=======================

//ROTAS :
//GET /api/cachorros/aleatorio
//GET /api/cachorros/:raca

// importar o framework Express para criar o servidor
const express = require("express");
// Importar o CORS para permitir requisições de outros dominios(ex:frontend)
const cors = require("cors");
// importar o módulo de arquivos do NODE
const fs = require("fs");
// Importa utilidades para trabalhar com caminhos de arquivos
const path = require("path");
// importa o arquivo JSON que contém as raças e fotos
const cachorros = require("./data/dogs.json");
// criar a aplicação Express
const app = express();
// definir a porta onde o servidor irá rodar
const PORT = 3000;
// Habilitar o uso do CORS na aplicação
app.use(cors());

//========================
// Servir arquivos estáticos
//========================

// Nós falamos para o express
// "Tudo o que estiver na pasta data/fotos pode ser acessado pela URl/fotos"
// exemplo:
// https://localhost:3000/fotos/husky/1.jpg

app.use(
    "/fotos",
    express.static(
        path.join(__dirname, "data/fotos") // caminho real da pasta do servidor
    )
);

//===================
// FUNÇÃO AUXILIAR
//====================

// função que recebe um array e retorna um item aleatório dele
function sortear(array) {
    // gere um número aleatório entre 0 e o tamanho do array
    // array.length - conta quantos itens existem na lista
    // Math.random() - Sorteia um número decimal entre 0 e 1
    // Math.random() * array.length - Multiplica o número sorteado pela quantidade de itens
    // Math.floor() - tira a parte decimal, arredondando para baixo.
    // const i = guarda a posição na variavel i
    const i = Math.floor(Math.random() * array.length);
    // retorna o item sorteado
    return array[i];
}


// ============ ROTAS DA API =============

// ROTA 1 - Cachorro aleatório
app.get("/api/cachorros/aleatorio", (req, res) => {
    // req - request(requisição) = é o pedido que chega ao servidor, por exemplo, o navegador pede uma foto de cachorro
    // res - response(resposta) = é o que o servidor envia de volta, por exemplo, o endereço da foto do cachorro

    // pegar todas as fotos de todas as raças
    // Object.values pega os valores do objeto
    // flat transforma tudo em um único array
    const todasAsFotos = Object.values(cachorros).flat();

    // sorteia uma foto aleatória
    const item = sortear(todasAsFotos);

    // responder para o cliente em formato JSON
    res.json({
        // status da resposta
        status: "success",
        // url da imagem que foi sorteada
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});


// ROTA 2 - Cachorro por raça
// exemplo de acesso:
// http://localhost:3000/api/cachorros/husky

app.get("/api/cachorros/:raca", (req, res) => {

    //pega o parametro da URL (ex: husky)
    const raca = req.params.raca.toLocaleLowerCase();
    //params = contém os parâmetros definidos na URL da rota
    //.raca = acessa o parâmetro chamado raca.

    if (!cachorros[raca]) {
        // cachorros[raca]: procurar a raça dentro do objeto *cachorro*
        // ! significa não: Nesse caso, verifica se a raça não existe ou se seu valor é falso
        
        // se não existir, retorna erro 404
        res.status(404).json({
            status: "error",
            message: `Raça "${raca}" não encontrada`
        });

        //encerra a execução da rota
        return;
    }

    //sorteia uma foto da raca solicitada
    const item = sortear(cachorros[raca]);

    // retorna a resposta em JSON
    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});


//=========================================
// INICIA O SERVIDOR
//=========================================

//inicia o servidor express
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Coloque as fotos manualmente em: data/fotos/`);
}); 