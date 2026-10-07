// JSON significa JavaScript Object Notation e é um formato de representação e troca de dados.

JSON É COMO FICHA DE CADASTRO:

FICHA FÍSICA:         JSON:
Nome:João             "nome": "João"
Idade:25              "idade": 25
Cidade: SP            "cidade": "SP"

É um formato para ORGANIZAR DADOS que TODO MUNDO entende(qualquer linguagem)

{
  "cachorro": {
    "nome": "Rex",
    "idade": 3,
    "raça": "Labrador",
    "vacinado": true,
    "peso": 25.5,
    "brinquedos": [
      "bola",
      "osso",
      "frisbee"
    ],
    "dono": {
      "nome": "João",
      "telefone": "1190028922"
    }
  }
}


<!====================================>
Explicação:
<!====================================>
//STRING(Texto)-Sempre com aspas
"nome":"Rex"

//NUMBER (Número)-Sem aspas 
"idade": 3,
"peso" : 25.5,

//BOOLEAN (true/false)
"vacinado": true,

//ARRAY (Lista)- com colchetes
"brinquedos" : ["bola", "osso"]

//OBJECT (Objeto)-com chaves
"dono":{
    "nome" :"João",
    "telefone":"1190028922"
}

//NULL (vazio)
"dataFalecimento":null


