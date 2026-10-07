//=======================
// API DE CACHORROS
//=======================

// Endereço da API que vamos utilizar 
const url = 'https://dog.ceo/api/breeds/image/random';

// Pegando os elementos do HTML

// - IMAGEM pelo seu ID (CORRIGIDO AQUI)
const fotoCachorro = document.getElementById('fotoCachorro');

// - Botão pelo seu ID
const btnNovaFoto = document.getElementById('btnNovaFoto');

//==================================
// - FUNÇÃO PARA BUSCAR UMA NOVA FOTO
//==================================

async function buscarFoto() {
    // Fazer uma requisição para a API
    const resposta = await fetch(url);

    // Converter a resposta da API para JSON
    const dados = await resposta.json();

    // Mostrar no console o que a API retornou
    console.log(dados);

    // Alterarmos o endereço da imagem no HTML
    fotoCachorro.src = dados.message;
}

//====================
// BOTÃO
//====================
// Quando o usuário clicar no botão, executa a função buscarFoto()
btnNovaFoto.addEventListener('click', buscarFoto);

// Quando a página abrir, já busca uma foto automaticamente
buscarFoto();