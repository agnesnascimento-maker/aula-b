// PARTE 1: Importar os módulos necessários
const express = require('express');
const path = require('path');
const { DatabaseSync } = require('node:sqlite'); //banco SQLite (já vem dentro do node!)

// PARTE 2: Criar o Servidor e abrir o banco
const app = express(); //cria o servidor
const banco = new DatabaseSync(path.join(__dirname, 'tarefas.db'));
//abre o banco(se não existir, cria o arquivo). -----> __dirname = pasta deste arquivo

// cria a tabela "tarefas" se ela ainda não existir
banco.exec(`
    CREATE TABLE IF NOT EXISTS tarefas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo      TEXT NOT NULL,
    concluida   INTEGER DEFAULT 0
    )
`);

// PARTE 3: Configurar o servidor (os famosos middlewares)
// app.use: "TODO pedido que chegar, passe primeiro por aqui."
app.use(express.json()); //faz o servidor entender JSON
app.use(express.static(path.join(__dirname, '..', 'public')));
// entrega a página da pasta "public"

//PARTE 4: ROTAS (a API)
//-------------------
// API: É O CONJUNTO DESSAS ROTAS
//
// Toda rota recebe 2 coisas(sempre na Ordem Abaixo):
// requisição = o PEDIDO que chegou 
// resposta = o que vamos devolver para o front.
//
// operação | Método HTTP | Endereço     | Comando SQL
// -----------------------------------------------
// Create   | POST        | /tarefas     | INSERT
// Read     | GET         | /tarefas     | SELECT
// Update   | PUT         | /tarefas/:id | UPDATE
// Delete   | DELETE      | /tarefas/:id | DELETE 

//===================== CRIAR =====================
//POST /tarefas ----> salvar uma tarefa nova no banco de dados(sqlite)
app.post('/tarefas', (requisicao, resposta) => {
    const titulo = requisicao.body.titulo; //texto enviado pela página

    // se o título estiver vazio, avisa que deu erro (400) e para aqui
    if (!titulo) {
        return resposta.status(400).json({ erro: 'Digite um título' });
    }

    // INSERT : adicionar uma linha na tabela. Lembre-se os "?" são trocados pelo valor do título
    banco.prepare('INSERT INTO tarefas (titulo) VALUES (?)').run(titulo);
    resposta.json({ ok: true }); // responde que deu certo.
});

// GET /tarefas -> devolve todas as tarefas
app.get('/tarefas', (requisicao, resposta) => {
    // SELECT : busca todas as linhas da tabela (as mais novas primeiro)
    const tarefas = banco.prepare('SELECT * FROM tarefas ORDER BY id DESC').all();
    resposta.json(tarefas);
});

//=============== ATUALIZAR =============
// PUT /tarefas/5 ------> muda a tarefa de id 5 (marca como feita ou pendente)
app.put('/tarefas/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const concluida = requisicao.body.concluida;

    // UPDATE: alterar a linha que tem o ID
    banco.prepare('UPDATE tarefas SET concluida = ? WHERE id = ?').run(concluida, id);
    resposta.json({ ok: true });
});

//============== APAGAR =================
// DELETE /tarefas/5 -----> apaga a tarefa de id 5
app.delete('/tarefas/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    // DELETE: remove a linha que tem esse id
    banco.prepare('DELETE FROM tarefas WHERE id = ?').run(id);

    resposta.json({ ok: true });
});

//--------------------------
// PARTE 5: LIGAR O SERVIDOR 
//-------------------------
app.listen(3000, () => {
   console.log('Servidor rodando em http://localhost:3000');
});