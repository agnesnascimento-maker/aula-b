// FUNÇÕES EM JAVASCRIPT

// O QUE É UMA FUNÇÃO?
// Uma função é um bloco de código reutilizável, criado para executar uma tarefa específica.

// Analogia SIMPLES:
// Você envia valores (parâmetros), ela processa e devolve um resultado (return).

//-----------------------------
// Estrutura básica de uma função
//-----------------------------

function nomeDaFuncao(parametro1, parametro2) {
    // código que será executado
    // return resultado;
}

// function ------------> Palavra-chave para declarar a função
// nomeDaFuncao --------> Nome da função
// parâmetro ----------> Valores que a função recebe
// return --------------> Valor que a função devolve

//-----------------------------
// EXEMPLO 1: Somar dois números
//-----------------------------

function somar(a, b) {
    return a + b;
}

console.log(somar(2, 15)); 


//-----------------------------
// EXEMPLO 2: Converter Real para Dólar
//-----------------------------

function realParaDolar(valorReal, cotacao) {
    return valorReal / cotacao;
}

console.log(realParaDolar(10, 5.20).toFixed(2));


//-----------------------------
// EXEMPLO 3: Converter Dólar para Real
//-----------------------------

function dolarParaReal(valorDolar, cotacao) {
    return valorDolar * cotacao;
}

console.log(dolarParaReal(10, 5.20).toFixed(2));


//-----------------------------
// EXEMPLO 4: Aumento de salário (25% de aumento)
//-----------------------------

function aumentoDeSalario(salarioAtual) {
    return salarioAtual * 1.25;
}

// Exemplo: R$ 2000.00 com 25% de aumento
console.log(aumentoDeSalario(2000).toFixed(2));

//-------------------
//EXEMPLO 5:Verifique se é par ou impar?
//-------------------

function parOuImpar(numero) {
    if (numero % 2 === 0) {
        return ("O número é Par");
    } else {
        return ("O número é Ímpar");
    }
}

console.log(parOuImpar(4)); 
  
// OU PODEMOS USAR :
function ParOuImpar(numero) {
    if (numero % 2 == 0) {
        return "O número " + numero + " é Par";
    } else {
        return "O número " + numero + " é Ímpar";
    }
}

console.log(ParOuImpar(4)); //  Par
console.log(ParOuImpar(7)); // Ímpar


