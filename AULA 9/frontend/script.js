/*
=====================================
  FRONT-END — consome nossa API local
=====================================
*/

const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const dogArea = document.querySelector(".dog-area");

// URL da nossa API Node.js rodando na porta 3000
const API = "http://localhost:3000/api/cachorros";

async function buscarCachorro(url) {
  dogArea.classList.add("loading");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "error") {
      breedName.textContent = data.message;
      dogImage.src = "";
      return;
    }

    // Define o caminho da imagem retornado pela API
    dogImage.src = data.message;

    // Extrai a raça do link (ex: http://localhost:3000/fotos/husky/1.jpg -> posição 4 é 'husky')
    const partes = data.message.split("/");
    const raca = partes[4];

    if (raca) {
      breedName.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
    } else {
      breedName.textContent = "";
    }

  } catch (erro) {
    console.error(erro);
    breedName.textContent = "📴 Servidor offline - rode: node server.js";
    dogImage.src = "";
  } finally {
    dogArea.classList.remove("loading");
  }
}

function cachorroAleatorio() {
  buscarCachorro(`${API}/aleatorio`);
}

function buscarPorRaca() {
  const raca = breedInput.value.trim().toLowerCase();

  if (!raca) {
    alert("Digite uma raça!");
    return;
  }

  buscarCachorro(`${API}/${raca}`);
}

// Eventos de clique e teclado
randomBtn.addEventListener("click", cachorroAleatorio);
searchBtn.addEventListener("click", buscarPorRaca);
dogImage.addEventListener("click", cachorroAleatorio);

breedInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buscarPorRaca();
  }
});

// Carrega o primeiro cachorro assim que a página abre
cachorroAleatorio();