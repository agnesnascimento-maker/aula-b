// NOSSA API DE CACHORROS
//=============================
//
// Agora as fotos não são ais baixadas automaticamente!.
// Elas DEVEM existir manualmente na pasta 
// data/fotos
//=======================

//ROTAS :
//GET/api/cachorros/aleatorio
//GET/api/cachorros/:raca

//importar o framework Express para criar o servidor
const express=require("express");
//Importar o CORS para permitir requisições de outros dominios(ex:frontend)
const cors=require("cors");
//importar o módulo de arquivos do NODE
const fs=require("fs")
//Importa utilidades para trabalhar com caminhos de arquivos
const path=require("paht")
//importa o arquivo JSON que contém as raças e fotos 
const cachorros= requite(".data/dogs.json")
//criar a aplicação Express
const app=express();
//definir a porta onde o servidor irá rodar
const PORT=3000;
//Habilitar o uso do CORS na aplicação
app.use(cors());

//========================
//Servir arquivos estáticos
//========================

//Nós falamos para o express
//"Tudo o que estiver na pasta data/fotos pode ser acessado pela URl/fotos"
//exemplo:
// https://localhost:3000/fotos/husky/1.jpg

app.use(
    "/fotos",
    express.static(
        path.join(__dirname,"data/fotos")//caminho real da pasta do servidor

    )

)

//===================
//FUNÇÃO AUXILIAR
//====================

//função que recebe um array e retorna um item aleatório dele
function sortear(array) {
    //gere um número aleatório entre 0 e o tamanho do array
    //array.length - conta quantos itens existem na lsita
    // math.random()-Sorteia um número decimal entre 0 e 1
    // math.random()*array.length -Multiplica o número sorteadi pela quantidade de itens
    //math.floor()-tira a parte decimal,arredondando para baixo.
    //const i= guarda a posição na variavel i
    const i=Math.floor(Math.random()*array.length)
    //retorna o item sorteado
    return array[i];
}