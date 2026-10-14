// NOSSA API DE CACHORROS
//=============================

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

let cachorros = {};
const jsonPathData = path.join(__dirname, "data", "dogs.json");
const jsonPathRoot = path.join(__dirname, "dogs.json");

if (fs.existsSync(jsonPathData)) {
    cachorros = require(jsonPathData);
} else if (fs.existsSync(jsonPathRoot)) {
    cachorros = require(jsonPathRoot);
} else {
    console.error("⚠️ ATENÇÃO: O arquivo dogs.json não foi encontrado em 'data/dogs.json' nem na raiz!");
}

const app = express();
const PORT = 3000;

app.use(cors());

// Servir a pasta de fotos estáticas (data/fotos)
app.use("/fotos", express.static(path.join(__dirname, "data", "fotos")));

// Servir a pasta frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "frontend")));

function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// ROTA 1 - Cachorro aleatório
app.get("/api/cachorros/aleatorio", (req, res) => {
    const todasAsFotos = Object.values(cachorros).flat();

    if (todasAsFotos.length === 0) {
        return res.status(500).json({
            status: "error",
            message: "Nenhuma foto de cachorro encontrada no banco de dados."
        });
    }

    const item = sortear(todasAsFotos);

    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

// ROTA 2 - Cachorro por raça
app.get("/api/cachorros/:raca", (req, res) => {
    const raca = req.params.raca.toLowerCase();

    if (!cachorros[raca]) {
        res.status(404).json({
            status: "error",
            message: `Raça "${raca}" não encontrada`
        });
        return;
    }

    const item = sortear(cachorros[raca]);

    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Coloque as fotos manualmente em: data/fotos/`);
});