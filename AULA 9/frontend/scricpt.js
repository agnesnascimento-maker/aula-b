/*
==================================================
FRONT-END - consome nossa API local
==================================================

Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/

//=======================================
// ELEMENTOS DO HTML
//=======================================
//foto do cachorro
const dogImage = document.getElementById("dogImage");
//nome raça
const breedName = document.getElementById("breedName");
//cachorro aleatório 
const randomBtn = document.getElementById("randomBtn");
//botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");
//campo de texto onde o usuário digita a raça
const breedInput = document.getElementById("breedInput");
//area onde fica a imagem do cachorro
//usamos querySelector porque é uma classe(.dog-area)
const dogArea = document.querySelector(".dog-area");

//==============
//URL da API
//==============

const API = "http://localhost:3000/api/cachorros";


//==============
//Função principal
//==============

async function buscaCachorro(url) {
    //adiciona a classe "loading"
    //normalmente usada para mostrar animação de carregamento
    dogArea.classList.add("loading");

    try {
        // faz requisição para a API
        const response = await fetch(url);
        // converte a resposta para JSON
        const data = await response.json();
        //mostra no console a resposta da API
        console.log("Resposta da API:", data);

        //Vamos verificar se API retornou erro 
        if (data.status === "error") {
            //mostra a mensagem de erro na tela
            breedName.textContent = data.message;
            //remove a imagem
            dogImage.src = "";
            return;
        }

        //coloca a imagem do cachorro na tela
        //o src define qual imagem será exibida
        dogImage.src = data.message;

        //extrai o nome da raça da URL da imagem
        //exemplo da URL:
        //http://localhost:3000/fotos/husky/1.jpg

        //separa a URL em partes usando "/"
        const partes = data.message.split("/");

        // pega a posição 5 do array
        // que corresponde ao nome da raça
        const raca = partes[5];

        //coloca a primeira letra maiúscula
        //ex: husky--> Husky
        breedName.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);

    } catch (erro) {
        //caso o servidor esteja desligado 
        //ou aconteça algum erro na requisição
        console.error(erro);

        //mostra mensagem na tela
        breedName.textContent = "Servidor offline - rode: node server.js";
    } finally {
        //remove a classe de carregamento tanto no sucesso quanto no erro
        dogArea.classList.remove("loading");
    }
}

//================
//AÇÕES
//================