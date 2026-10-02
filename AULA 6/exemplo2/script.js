//=============================
// SELECIONANDO ELEMENTOS DOM
//=============================
let titulo = document.getElementById("titulo");
let subtitulo = document.getElementById("subtitulo");
let paragrafo = document.getElementById("paragrafo");
let imagem = document.getElementById("imageteste");

let caixas = document.getElementsByClassName("box");

// Mostrar no console
console.log(titulo);
console.log(subtitulo);
console.log(paragrafo);
console.log(caixas);
console.log(imagem);

//=========================
// FUNÇÕES PARA ALTERAR O CONTEÚDO
//========================

// Função que coloca os textos originais do Snoopy
function mostrarOriginal(){
    titulo.innerText = "Título Principal";
    subtitulo.innerText = "Subtítulo";
    paragrafo.innerText = '"Ontem fui um cão. Hoje sou um cão. Amanhã provavelmente vou continuar a ser um cão. Há tão pouca esperança de avanço."';
    caixas[0].innerText = '"Ontem fui um cão. Hoje sou um cão. Amanhã provavelmente vou continuar a ser um cão. Há tão pouca esperança de avanço."';
    caixas[1].innerText = "Snoopy com seu amigo Woodstock:";
    imagem.src = "snoopyy.png";
    
    // Na próxima vez que clicar, vai executar a função de alterar
    alterar = mostrarAlterado;
}

// Função que altera para o Stranger Things
function mostrarAlterado(){
    titulo.innerText = "Agnes gosta de ler!";
    subtitulo.innerText = "Sim ela ama !!";
    paragrafo.innerText = "O texto do parágrafo foi modificado pelo JavaScript";
    caixas[0].innerText = "Segundo parágrafo alterado";
    caixas[1].innerText = "Segundo parágrafo alterado";
    imagem.src = "stranger things.png";
    
    // Na próxima vez que clicar, vai executar a função original
    alterar = mostrarOriginal;
}

// Define que o primeiro clique vai acionar 'mostrarAlterado'
let alterar = mostrarAlterado;
