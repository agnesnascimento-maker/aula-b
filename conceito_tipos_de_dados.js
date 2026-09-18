// TIPOS DE DADOS
// No Javascript, tudo o que armazenamos em variáveis tem um tipo. Esses tipos definem o que podemos fazer com os valores.

// Principais tipos de dados:
// String (textos)
// Number (números)
// Boolean (verdadeiro ou falso)
// Object (Objetos, que agrupam informações)
// Array (Listas de valores)
// Null (Valor vazio)
// Undefined (quando algo não foi definido)

// STRING (Textos)
// Uma String é um texto, sempre escrito entre aspas ("" ou '')
let nome = "Jarvis";
let mensagem = "Olá, Mundo!";

console.log(nome);
console.log(mensagem);

let saudacao = "Olá, " + nome + "!";
console.log(saudacao); // Exibe "Olá, Jarvis!"

// typeof
// O typeof serve para descobrir o tipo de um valor ou variável
let nomeDois = "Nicoly";
console.log(typeof nomeDois);

let soma = 10 + 5;
console.log(soma);

// BOOLEAN (Verdadeiro ou Falso)
// Um Boolean pode ter apenas dois valores: true (verdadeiro) ou false (falso)

let maiorDeIdade = true;
let menorDeIdade = false;

console.log(maiorDeIdade); // Exibe true
console.log(menorDeIdade); // Exibe false

let idade = 16;
let podeDirigir = idade >= 18;
console.log(podeDirigir); // Exibe false

